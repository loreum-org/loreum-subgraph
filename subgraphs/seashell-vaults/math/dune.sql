with tokens(contract_address, symbol, decimals, underlying_name) as (
    values
    -- Arbitrum Tokens
    (0xc18f39f25c9995c0bb51512e48ca8d8ea505ecfc, 'bvlGLP', 18, 'Blueberry GLP Leveraged Compounder LP Token'),
    (0x699332b18605907c14d70463d47358783c91bf55, 'bvlUSDC', 6, 'Blueberry USDC Vault LP Token'),
    (0x5bac5eefa13696cf815388021235b215587263ea, 'bvnGLP', 18, 'Blueberry GLP Non-Leveraged LP Token'),
    (0x8e10cac8e0801a476b0906ea32312a9f5ca572ac, 'GLPStrat', 18, 'GLP Leverage Strategy'),
    (0x243466721083622c31e7fbcb93248ca2e4adca68, 'wGLP', 18, 'Wrapped GLP'),
    (0x4277f8f2c384827b5273592ff7cebd9f2c1ac258, 'GLP', 18, 'GMX LP'),
    (0x4e971a87900b931fF39d1Aad67697F49835400b6, 'fGLP', 18, 'Fee GLP'),
    (0x1addd80e6039594ee970e5872d247bf0414c8903, 'fsGLP', 18, 'Fee and Staked GLP'),
    (0xff970a61a04b1ca14834a43f5de4533ebddb5cc8, 'USDC', 6, 'USDC'),
    (0x82af49447d8a07e3bd95bd0d56f35241523fbab1, 'WETH', 18, 'WETH'),
    (0xda10009cbd5d07dd0cecc66161fc93d7c9000da1, 'DAI', 18, 'DAI'),
    (0xf97f4df75117a78c1a5a0dbb814af92458539fb4, 'LINK', 18, 'LINK'),
    (0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9, 'USDT', 6, 'USDT'),
    (0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0, 'UNI', 18, 'UNI'),
    (0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a, 'MIM', 18, 'MIM'),
    (0x17fc002b466eec40dae837fc4be5c67993ddbd6f, 'FRAX', 18, 'FRAX'),
    (0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f, 'WBTC', 8, 'WBTC')
),
glp_values as (
    SELECT
        cast(aumInUsdg as double) as glp_aum,
        cast(glpSupply as double) as glp_supply,
        cast(aumInUsdg as double) / cast(glpSupply as double) as glp_price
    FROM
        gmx_arbitrum.GlpManager_updated_evt_AddLiquidity
    order by
        evt_block_time DESC
    limit
        1
),
aum as (
    select
        cast(call_block_time as date) as date,
        call_block_time,
        output_0 / 1e18 as glp_balance
    from
        blueberry_leverage_strategy_arbitrum.GLPLeverageStrategy_call_balanceOfEquity
    where
        call_success = true
),
aum_per_date as (
    select
        date,
        glp_balance
    from
        (
            select
                date,
                glp_balance,
                ROW_NUMBER() OVER (
                    PARTITION BY date
                    ORDER BY
                        call_block_time DESC
                ) as ranked_order
            from
                aum
        ) as ranked
    where
        ranked_order = 1
),
all_dates as (
    select
        min(date) as first_date,
        max(date) as last_date
    from
        aum_per_date
),
all_date_sequence as (
    select
        cast(date_column as date) as date
    from
        (
            select
                sequence(first_date, last_date, interval '1' day) as days
            from
                all_dates
        ) as t1(date_array)
        cross join unnest(date_array) as t2(date_column)
),
balance_by_day as (
    select
        all_date_sequence.date,
        aum_per_date.glp_balance
    from
        all_date_sequence
        left join aum_per_date on all_date_sequence.date = aum_per_date.date
),
balance_by_day_complete as (
    select
        date,
        ROUND(glp_balance, 2) as total_glp,
        ROUND(glp_balance * glp_price, 2) as total_usd
    from
        balance_by_day
        cross join glp_values
),
balance_by_day_filled as (
    SELECT
        date,
        first_value(total_glp) over (
            partition by value_partition
            order by
                date
        ) as first_glp,
        first_value(total_usd) over (
            partition by value_partition
            order by
                date
        ) as first_usd
    FROM
        (
            SELECT
                date,
                total_glp,
                total_usd,
                sum(
                    case
                        when total_glp is null then 0
                        else 1
                    end
                ) over (
                    order by
                        date
                ) as value_partition
            FROM
                balance_by_day_complete
        )
)
select
    date,
    first_glp as total_glp,
    first_usd as total_usd
from
    balance_by_day_filled
WHERE
    date >= date('2023-5-30')
ORDER BY
    date DESC