import { ProviderContext } from 'notistack';
import { NavigateFunction } from 'react-router-dom';
import { UiService } from '@common/ui/ui.interface';

export class WebUiService implements UiService {
  isMobile = false;

  notify!: ProviderContext['enqueueSnackbar'];

  go!: NavigateFunction;
}
