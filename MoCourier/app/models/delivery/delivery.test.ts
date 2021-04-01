import { DeliveryModel, Delivery } from "./delivery"

test("can be created", () => {
  const instance: Delivery = DeliveryModel.create({})

  expect(instance).toBeTruthy()
})