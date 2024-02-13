import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ChamberDeployed } from "../generated/schema"
import { ChamberDeployed as ChamberDeployedEvent } from "../generated/MultiProxy/MultiProxy"
import { handleChamberDeployed } from "../src/multi-proxy"
import { createChamberDeployedEvent } from "./multi-proxy-utils"

