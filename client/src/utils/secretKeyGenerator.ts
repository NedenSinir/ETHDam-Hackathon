function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach((byte) => binary += String.fromCharCode(byte));
  return window.btoa(binary);
}
function base64ToArrayBuffer(publicKey: string): ArrayBuffer {
  const binaryString = window.atob(publicKey);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
export const generateSecretKey = async () => {
    // Implement your logic to generate a secret key here
    // For example, you can use a library like uuid or crypto to generate a random key
      const keyPair = await window.crypto.subtle.generateKey(
          {
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: 2048,
              publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
              hash: "SHA-256",
          },
          true,
          ["sign", "verify"]
      );
  
      const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
      const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
  
      // The keys are exported as ArrayBuffer. You might want to convert them to a different format.
      return ({ publicKey: arrayBufferToBase64(publicKey), privateKey: arrayBufferToBase64(privateKey)});
    
  }  
  