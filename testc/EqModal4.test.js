import { localStorageImpl } from "../test-utils/mock-local-storage";
import { renderWithWrapper } from "../test-utils/render-with-wrapper";
import EqModal4Opener, { openModal } from "./EqModal4/EqModal4Opener";
import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";

describe("EqModal4 - Modale pour modifier les équivalences de la partie livraison", () => {
  let local_storage;

  beforeEach(async () => {
    const { storage } = localStorageImpl.register();
    local_storage = storage;
  });
  afterEach(async () => {
    localStorageImpl.unregister();
  });

  it("Ne s'affiche pas du tout dans la page, par défaut", () => {
    // Given
    renderWithWrapper(<EqModal4Opener />);
    expect(screen.queryByTestId("eqs_modal_intro")).not.toBeInTheDocument();
    // When
    act(() => {
      openModal(screen);
    });
    // Then
    expect(screen.getByTestId("eqs_modal_intro")).toHaveTextContent(
      "Sélectionnez plusieurs équivalences pour comparer votre impact et créer votre infographie personnalisée."
    );
  });

  it("Stocke en local les options par défaut - voiturethermique, repasavecduboeuf, streamingvideo", () => {
    // Given
    expect(local_storage.ico2_eqv_chosen).toEqual(undefined);
    // When
    renderWithWrapper(<EqModal4Opener />);
    // Then
    expect(local_storage.ico2_eqv_chosen).toEqual(
      JSON.stringify(["voiturethermique", "repasavecduboeuf", "streamingvideo"])
    );
  });
  it("Affiche dans une colonne les options présentes par défaut, avec un nom détaillé", () => {
    //Given
    renderWithWrapper(<EqModal4Opener />);
    // When
    act(() => {
      openModal(screen);
    });
    // Then
    expect(screen.getByTestId("chosen-voiturethermique")).toHaveTextContent("Voiture (moteur thermique)");
    expect(screen.getByTestId("chosen-repasavecduboeuf")).toHaveTextContent("Repas avec du boeuf");
    expect(screen.getByTestId("chosen-streamingvideo")).toHaveTextContent("Streaming vidéo");
  });
  it("Les valeurs choisies s'affichent dans la colonne de gauche, même si ne sont pas celles par défaut", () => {
    //Given
    window.localStorage.setItem("ico2_eqv_chosen", JSON.stringify(["ail", "abricot", "banane"]));
    window.localStorage.setItem("ico2_eqv_array", JSON.stringify(["ail", "abricot", "banane"]));
    renderWithWrapper(<EqModal4Opener />);
    // // When
    act(() => {
      openModal(screen);
    });
    // // Then
    expect(screen.getByTestId("chosen-banane")).toHaveTextContent("Banane");
    expect(screen.getByTestId("chosen-abricot")).toHaveTextContent("Abricot");
    expect(screen.getByTestId("chosen-ail")).toHaveTextContent("Ail");
    expect(screen.getByTestId("eqs_selected")).toHaveTextContent("3/3 équivalences sélectionnées");
  });
  it("Les valeurs s'affichent dans la colonne de gauche, même s'il n'y en a que 2", () => {
    //Given
    window.localStorage.setItem("ico2_eqv_chosen", JSON.stringify(["ail", "abricot"]));
    window.localStorage.setItem("ico2_eqv_array", JSON.stringify(["ail", "abricot"]));
    renderWithWrapper(<EqModal4Opener />);
    // When
    act(() => {
      openModal(screen);
    });
    // Then
    expect(screen.getByTestId("chosen-abricot")).toHaveTextContent("Abricot");
    expect(screen.getByTestId("chosen-ail")).toHaveTextContent("Ail");
    expect(screen.getByTestId("eqs_selected")).toHaveTextContent("2/3 équivalences sélectionnées");
  });
  it("On peut rajouter une option", () => {
    //Given
    window.localStorage.setItem("ico2_eqv_chosen", JSON.stringify(["ail", "abricot"]));
    window.localStorage.setItem("ico2_eqv_array", JSON.stringify(["ail", "abricot"]));
    renderWithWrapper(<EqModal4Opener />);
    act(() => {
      openModal(screen);
    });
    expect(screen.getByTestId("eqs_selected")).toHaveTextContent("2/3 équivalences sélectionnées");
    // When
    act(() => {
      screen.getByTestId("unchecked-coing").click();
    });
    // Then
    expect(screen.getByTestId("eqs_selected")).toHaveTextContent("3/3 équivalences sélectionnées");
  });
  it("Affiche le nombre d'options choisies, et le nombre d'options max", () => {
    //Given
    renderWithWrapper(<EqModal4Opener />);
    // When
    act(() => {
      openModal(screen);
    });
    // Then
    expect(screen.getByTestId("eqs_selected")).toHaveTextContent("3/3 équivalences sélectionnées");
  });
  it("Retire une option si un utilisateur clique dessus", () => {
    //Given
    renderWithWrapper(<EqModal4Opener />);
    act(() => {
      openModal(screen);
    });
    expect(screen.queryByTestId("chosen-voiturethermique")).toBeInTheDocument();

    // When
    act(() => {
      screen.getByTestId("chosen-voiturethermique").click();
    });

    // Then
    expect(screen.queryByTestId("chosen-voiturethermique")).not.toBeInTheDocument();
  });
  it("Mets à jour le compteur si un utilisateur retire une option", () => {
    //Given
    renderWithWrapper(<EqModal4Opener />);
    act(() => {
      openModal(screen);
    });
    expect(screen.getByTestId("eqs_selected")).toHaveTextContent("3/3 équivalences sélectionnées");

    // When
    act(() => {
      screen.getByTestId("chosen-voiturethermique").click();
    });

    // Then
    expect(screen.getByTestId("eqs_selected")).toHaveTextContent("2/3 équivalences sélectionnées");
  });
});
