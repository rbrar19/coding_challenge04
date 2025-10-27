import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json"; // Ensure this file is in .gitignore


admin.initializeApp({
credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});


export const auth = admin.auth();
