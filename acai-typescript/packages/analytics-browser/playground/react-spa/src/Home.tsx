function Home() {
  return (
    <div>
    <h1>Please test the track function</h1>
    <button onClick={() => (window as any).acai.track('Button Click', { name: 'App' })}>
        Track
    </button>
    </div>
  );
}

export default Home;
