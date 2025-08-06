// arquivo de definição de tipos (por isso 'd' na extensão) terão só códigos específicos para TypeScript

import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme;

declare module 'styled-components'{
    export interface defaultTheme extends ThemeType{} // usamos a interface DefaultTheme para visualizar as propriedades dentro do nosso ThemeType, 
                                                      //como cores, etc, sem isso o typescript não as "enxerga"
}