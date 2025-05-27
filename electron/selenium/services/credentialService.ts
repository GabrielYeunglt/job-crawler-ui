import crypto from 'crypto';

export class CredentialService {
  private static readonly key = Buffer.from('1234567890a234!67b901234', 'utf-8'); // 24 bytes for AES-192
  private static readonly algorithm = 'aes-192-cbc'; // Or use 'aes-256-cbc' if key is 32 bytes

  static encrypt(plainText: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    const encrypted = Buffer.concat([
      cipher.update(plainText, 'utf8'),
      cipher.final()
    ]);

    const result = Buffer.concat([iv, encrypted]);
    return result.toString('base64');
  }

  static decrypt(encryptedText: string): string {
    const fullCipher = Buffer.from(encryptedText, 'base64');

    const iv = fullCipher.slice(0, 16);
    const cipherText = fullCipher.slice(16);

    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);

    const decrypted = Buffer.concat([
      decipher.update(cipherText),
      decipher.final()
    ]);

    return decrypted.toString('utf8');
  }
}
