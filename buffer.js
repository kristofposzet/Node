const safeBuffer = Buffer.alloc(10);
const unsafeBuffer = Buffer.allocUnsafe(10);

safeBuffer.write('Helloooo!!');
console.log(safeBuffer, unsafeBuffer);
// copy sub array
unsafeBuffer.set(safeBuffer.subarray(0, 5));
console.log(unsafeBuffer.toString());
