export interface NoPriceHoldingI {
  avgCost: number
  company: string
  quantity: number
  ticker: string
}

export interface HoldingI extends NoPriceHoldingI{
  price: number
}