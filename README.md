## Loreum Subgraphs

You will need to have a local docker engine running. 

1. Open three terminals:

*terminal 1*

Start the docker stack.
```shell
# got intel machines
yarn intel
# for macs
yarn m1
```
NOTE: You should see blocks ticking on local evm

*terminal 2*

Compile and deploy the contracts in loreum-org/loreum-nft
```shell
yarn compile
yarn deploy:local
yarn cycle
```

*terminal 3*

Compile and deploy the subgrpah
```shell
cd subgraphs/loreum-nft
yarn test
yarn codegen
yarn build:local
yarn create:local
yarn deploy:local
```

NOTE: If you evm isn't ticking or functionality is off, you may need to prune your docker images:
`docker system prune --volumes`