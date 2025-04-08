import {DataModelBase} from "@/src/architecture/DataModel/DataModelBase";
import {Maybe} from "@/helpers/types.helper";
import {computed, makeObservable} from "mobx";

type TData = Maybe<IGetPokemonDataResponse>;

export class PokemonModel extends DataModelBase<TData> {
    constructor(props?: any) {
        super(props);
        makeObservable(this);
    }

    @computed
    public get weight() {
        return this.data?.weight;
    }

    @computed
    public get height() {
        return this.data?.height;
    }

    @computed
    public get weightAndHeight() {
        return `weight: ${this.weight},   height: ${this.height}`;
    }

}
