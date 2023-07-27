import { ProviderContext } from 'notistack';
import { NavigateFunction } from 'react-router-dom';
import { UiService } from '@common/ui/ui.interface';
import { makeAutoObservable } from 'mobx';

export class WebUiService implements UiService {
  constructor() {
    makeAutoObservable(this);
  }
  isMobile = false;

  navigate?: NavigateFunction;

  notify!: ProviderContext['enqueueSnackbar'];

  go(to: string, props: any) {
    this.navigate!(to, { state: props });
  }
}
