export function navigate({self, routeName, params}) {
  if (routeName) {
    self.navigate({routeName, params});
  }
}

export const goBack = self => {
  self.back({});
};
