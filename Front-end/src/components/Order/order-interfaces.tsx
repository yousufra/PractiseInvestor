 export interface CompanyStateProperties {
  name: string;
  symbol: string;
  data: {
    price: number;
  };
}

export interface Company {
  company: CompanyStateProperties[];
  
}

export interface TickerStateProperties {
  ticker: string;
}

export interface SuggestionsStateProperties {
  name: any | null | undefined;
  
}


