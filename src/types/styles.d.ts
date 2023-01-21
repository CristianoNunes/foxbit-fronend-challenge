import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bg: {
        positive: {
          50: string;
        };
        negative: {
          50: string;
        };
      };
      content: {
        positive: {
          800: string;
        };
        negative: {
          800: string;
        };
      };
    };

    typography: {
      size: {
        xxxs: string;
        xxs: string;
        sm: string;
        md: string;
      };
    };
  }
}
