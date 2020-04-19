export function withDate(target: Object, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const method = descriptor.value;

  descriptor.value = function (data, ...args) {
    const now = new Date().toUTCString();
    const updatedData = {
      ...(typeof data === 'object' ? { ...data } : { value: data }),
      date: now,
    };

    return method.apply(this, [updatedData, ...args]);
  };

  return descriptor;
}
