import 'styled-components';
import { defaultTheme } from '..styles/themes/default';

type themeType = typeof defaultTheme

declare module 'styled-compoents'{
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends themeType {}
}