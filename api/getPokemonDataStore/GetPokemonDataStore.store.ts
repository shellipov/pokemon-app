import { injectable } from 'inversify';
import { AsyncDataHolder, IAsyncDataHolder } from '@/api/holder';
import { Maybe } from '@/helpers/types.helper';
import { action, computed, makeObservable } from 'mobx';
import axios from 'axios';
import { Alert } from 'react-native';
import { PokemonModel } from '@/api/getPokemonDataStore/Pokemon.model';
import { IGetPokemonRequest, IGetPokemonResponse } from '@/api/getPokemonDataStore/GetPokemonDataStore.types';

type TData = Maybe<IGetPokemonResponse>;

export interface IGetPokemonDataStore {
  readonly holder: IAsyncDataHolder<IGetPokemonResponse>;
  readonly data: TData;
  refresh(req: IGetPokemonRequest): void;
}

@injectable()
export class GetPokemonDataStore implements IGetPokemonDataStore {
  public holder = new AsyncDataHolder<IGetPokemonResponse>();
  public model = new PokemonModel(() => this.data?.data);

  constructor (
  ) {
    makeObservable(this);
  }

  @computed
  public get data () {
    return this.holder.data;
  }

  @action.bound
  public async refresh (req: IGetPokemonRequest): Promise<void> {
    try {
      this.holder.setLoading();
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.name}`) as IGetPokemonResponse;
      this.holder.setData(res);
    } catch (err: any) {
      this.holder.setError(err);
      Alert.alert('Error', err.message || err.Message || err.apiMessage || 'Ошибка загрузки данных');
    }
  }
}
