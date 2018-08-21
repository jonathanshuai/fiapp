export class Restriction {
  constructor(
    public vegetarian: boolean,
    public vegan: boolean,
    public peanut_free: boolean,
    public userid?: number,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }
}