import { Preferences } from "@capacitor/preferences";

export async function lire<T>(cle: string, defaut: T, valide: (x: unknown) => x is T): Promise<T> {
    const donnees = await Preferences.get({ key: cle });
    if (donnees.value === null) {
    return defaut;
    }
    try{
    const resultat: unknown = JSON.parse(donnees.value);
    if(!valide(resultat)) {
        return defaut;
    }
    return resultat;
    }catch (e) {
    console.error(e);
    return defaut;
    }
}

export async function ecrire<T>(cle: string, valeur: T): Promise<void>{
    await Preferences.set({key: cle, value: JSON.stringify(valeur)});

}
