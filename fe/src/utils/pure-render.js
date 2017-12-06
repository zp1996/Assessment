function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (
      typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const HasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    if (!HasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldComponentUpdate(nextProps, nextState) {
  return !nextProps.load && (
    !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  );
}

/**
 * 定制化pure-render机制,防止设置loading前的那次多余rernder
 * 注意仅仅适用于load代表了dva的loading
 */
export default function PureRender(component) {
  if (component.prototype.shouldComponentUpdate == null) {
    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  }
  return component;
}
