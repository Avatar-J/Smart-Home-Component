let lightControllerMock: any;
let advancedSettingsMock: any;

jest.mock("./../js/basicSettings", () => {
  return jest.fn().mockImplementation(() => {
    lightControllerMock = {
      addHidden: jest.fn(),
      removeHidden: jest.fn(),
      toggleLightSwitch: jest.fn(),
      handleLightIntensitySlider: jest.fn(),
    };
    return lightControllerMock;
  });
});

jest.mock("./../js/advanceSettings", () => {
  return jest.fn().mockImplementation(() => {
    advancedSettingsMock = {
      modalPopUp: jest.fn(),
      closeModalPopUp: jest.fn(),
      displayCustomization: jest.fn(),
      customizeAutomaticOnPreset: jest.fn(),
      customizeAutomaticOffPreset: jest.fn(),
      customizationCancelled: jest.fn(),
    };
    return advancedSettingsMock;
  });
});

import Light from "./../js/basicSettings";
import AdvanceSettings from "./../js/advanceSettings";

describe("Event Handling", () => {
  let lightController: Light;
  let advancedSettings: AdvanceSettings;

  beforeEach(() => {
    document.body.innerHTML = `
  <button class="entry_point">Enter</button>
  <main></main>
  <div class="application_container hidden"></div>
  <div class="advanced_features_container"></div>
  <nav class="hidden"></nav>
  <div class="loader-container hidden"></div>
`;

    lightController = new Light();
    advancedSettings = new AdvanceSettings();

    jest.useFakeTimers();
    require("./../js/main");
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetModules();
  });

  test("Clicking homepage button hides homepage and shows loader", () => {
    const homepageButton = document.querySelector(
      ".entry_point"
    ) as HTMLButtonElement;

    if (homepageButton) {
      homepageButton.click();
    }

    // expect(lightController.addHidden).toHaveBeenCalledWith(expect.any(HTMLElement));
    // expect(lightController.removeHidden).toHaveBeenCalledWith(expect.any(HTMLElement));
    jest.advanceTimersByTime(1000);
    expect(lightController.removeHidden).toHaveBeenCalledTimes(3);
  });

  test("clicking light-switch triggers toggleLightSwitch", () => {
    require("./../js/main");

    const lightSwitch = document.querySelector(".light-switch") as HTMLElement;

    lightSwitch.click();

    expect(lightControllerMock.toggleLightSwitch).toHaveBeenCalledWith(
      expect.any(HTMLElement)
    );
  });

  test("clicking advance-settings_modal triggers modalPopUp", () => {
    require("./../js/main");

    const modalBtn = document.querySelector(
      ".advance-settings_modal"
    ) as HTMLElement;

    modalBtn.click();

    expect(advancedSettingsMock.modalPopUp).toHaveBeenCalledWith(
      expect.any(HTMLElement)
    );
  });

  test("changing the slider triggers handleLightIntensitySlider", () => {
    require("./../js/main");

    const slider = document.querySelector(
      ".intensity-slider"
    ) as HTMLInputElement;

    slider.value = "90";
    slider.dispatchEvent(new Event("change"));

    expect(lightControllerMock.handleLightIntensitySlider).toHaveBeenCalledWith(
      slider,
      90
    );
  });
});
