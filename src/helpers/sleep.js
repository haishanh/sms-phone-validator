function sleep(t) {
  return new Promise(r => setTimeout(r, t));
}

export default sleep;
