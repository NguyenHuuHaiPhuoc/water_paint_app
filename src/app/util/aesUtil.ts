import * as CryptoJS from 'crypto-js';

export class AESUtil {
	private static secretKey = CryptoJS.enc.Utf8.parse("mySecretKey2502252805qiuqing0207");
	private static iv = CryptoJS.enc.Utf8.parse("1234567890123456");

	static decrypt(encryptedData: string): string{
		const bytes = CryptoJS.AES.decrypt(encryptedData, AESUtil.secretKey, {
		    iv: AESUtil.iv,
		    mode: CryptoJS.mode.CBC,
		    padding: CryptoJS.pad.Pkcs7
		});

		try{
			const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
	        // console.log("Dữ liệu sau khi giải mã:", bytes.toString(CryptoJS.enc.Utf8))
	        return decryptedText;
		} catch(e){
			console.error(e);
			return "Error!";
		}
	}
}