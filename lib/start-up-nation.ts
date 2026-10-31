export const startUpNationServiceIds = [
  "pachet-start-up-nation",
  "inscriere-curs-antreprenoriat",
  "infiintare-firma-sun"
] as const;

type StartUpNationService = typeof startUpNationServiceIds[number];

const services: Record<StartUpNationService, { label: string; optionLabel: string; description: string; message: string }> = {
  "pachet-start-up-nation": {
    label: "Pachet Start-Up Nation: înscriere curs + înființare firmă",
    optionLabel: "Pachet SUN: curs + firmă",
    description: "Asistență pentru înscrierea la cursul de antreprenoriat și pentru înființarea firmei în parcursul Start-Up Nation.",
    message: "Mă interesează pachetul Start-Up Nation: asistență pentru înscrierea la cursul de antreprenoriat și înființarea firmei. Doresc detalii despre condiții, tarif și pașii necesari."
  },
  "inscriere-curs-antreprenoriat": {
    label: "Asistență înscriere curs antreprenoriat Start-Up Nation",
    optionLabel: "SUN: înscriere la curs",
    description: "Sprijin pentru pregătirea și înscrierea la cursul de antreprenoriat din cadrul Start-Up Nation.",
    message: "Mă interesează asistența pentru înscrierea la cursul de antreprenoriat Start-Up Nation. Doresc detalii despre condiții, tarif și pașii necesari."
  },
  "infiintare-firma-sun": {
    label: "Înființare firmă pentru Start-Up Nation",
    optionLabel: "SUN: înființare firmă",
    description: "Asistență pentru formalitățile de înființare a firmei în parcursul Start-Up Nation.",
    message: "Mă interesează înființarea unei firme pentru Start-Up Nation. Doresc detalii despre condiții, tarif și documentele necesare."
  }
};

export const startUpNationPackageHref = "/contact?service=pachet-start-up-nation#formular-contact";
export const startUpNationPackageEvent = "ce:start-up-nation-package";

export function getStartUpNationService(service: string) {
  return startUpNationServiceIds.includes(service as StartUpNationService)
    ? services[service as StartUpNationService]
    : undefined;
}

export const startUpNationServiceOptions = startUpNationServiceIds.map((id) => [id, services[id].optionLabel] as const);
