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
import { ChamberDeployed as ChamberDeployedEvent } from "../generated/Registry/Registry"
import { handleChamberDeployed } from "../src/registry"
import { createChamberDeployedEvent } from "./registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

import { Bytes } from "@graphprotocol/graph-ts"
import { ChangedGuard } from "../generated/schema"
import { ChangedGuard as ChangedGuardEvent } from "../generated/Registry/Registry"
import { handleChangedGuard } from "../src/registry"
import { createChangedGuardEvent } from "./registry-utils"

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let chamber = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let serial = BigInt.fromI32(234)
    let deployer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let memberToken = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let govToken = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newChamberDeployedEvent = createChamberDeployedEvent(
      chamber,
      serial,
      deployer,
      memberToken,
      govToken
    )
    handleChamberDeployed(newChamberDeployedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChamberDeployed created and stored", () => {
    assert.entityCount("ChamberDeployed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChamberDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "chamber",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChamberDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "serial",
      "234"
    )
    assert.fieldEquals(
      "ChamberDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "deployer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChamberDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "memberToken",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChamberDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "govToken",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let guard = Address.fromString("0x0000000000000000000000000000000000000001")
    let newChangedGuardEvent = createChangedGuardEvent(guard)
    handleChangedGuard(newChangedGuardEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChangedGuard created and stored", () => {
    assert.entityCount("ChangedGuard", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChangedGuard",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "guard",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})