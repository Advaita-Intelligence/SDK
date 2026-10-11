function Other() {
  return (
    <div>
    <h1>Test other functions here</h1>
    <button onClick={() => (window as any).acai.identify(new (window as any).acai.Identify().set('role', 'engineer'))}>
        Identify
    </button>
    <button onClick={() => (window as any).acai.setGroup('org', 'engineering')}>
        Group
    </button>
    <button onClick={() => (window as any).acai.groupIdentify('org', 'engineering', new (window as any).acai.Identify().set('technology', 'react.js'))}>
          Group Identify
    </button>
    </div>

  );
}

export default Other;
