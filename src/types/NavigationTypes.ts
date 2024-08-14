// src/types/NavigationTypes.ts
export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    ProductList: undefined;
  };
  
  export type StackNavigationProps<T extends keyof RootStackParamList> = {
    navigation: {
      navigate: (screen: T, params?: RootStackParamList[T]) => void;
    };
    route: {
      params?: RootStackParamList[T];
    };
  };
  