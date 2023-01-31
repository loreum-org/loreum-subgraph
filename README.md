## Loreum Subgraphs

You will need to have a local docker engine running. 

1. Open three terminals:

*terminal 1*

Start the docker stack.
```shell
# for intel machines
yarn intel
# for macs
yarn mac
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

Compile and deploy the subgraph
```shell
cd subgraphs/loreum-nft
yarn codegen
yarn build:local
yarn test
yarn create:local
yarn deploy:local
```

NOTE: If your evm isn't ticking or functionality is off, you may need to prune your docker images:
`docker system prune --volumes`