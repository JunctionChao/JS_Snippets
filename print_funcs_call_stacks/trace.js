function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.trace('调用堆栈');
}

a();