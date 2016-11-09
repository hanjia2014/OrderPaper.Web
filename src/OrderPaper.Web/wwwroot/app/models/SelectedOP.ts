import { OrderPaper }   from '../models/orderpaper';
export class SelectedOP {
    Id: number;
    Saved: boolean;
    Value: OrderPaper;

    public compare = (orderPaper: OrderPaper): boolean => {
        return JSON.stringify(this.Value) == JSON.stringify(orderPaper);
    }
}