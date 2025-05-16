import AdvanceSettings from "./../js/advanceSettings";

const componentData = {
  name: "bathroom",
  lightIntensity: 5,
  numOfLights: 1,
  isLightOn: false,
  autoOn: "06:30",
  autoOff: "22:00",
  usage: [2, 1, 1, 1, 1, 3, 3],
};

describe("AdvanceSettings", () => {
  let newAdvance: AdvanceSettings;

  beforeEach(() => {
    newAdvance = new AdvanceSettings();

    document.body.innerHTML = `
      <div class="advanced_features_container"></div>
      <span class="auto_on"><span></span><span></span></span>
      <span class="auto_off"><span></span><span></span></span>
    `;

    newAdvance["getComponent"] = jest.fn().mockReturnValue(componentData);
    newAdvance["selector"] = jest.fn((selector) =>
      document.querySelector(selector)
    );
    newAdvance["renderHTML"] = jest.fn();
    newAdvance["removeHidden"] = jest.fn();
    newAdvance["toggleHidden"] = jest.fn();
    newAdvance["addHidden"] = jest.fn();
    newAdvance["closestSelector"] = jest.fn(() =>
      document.createElement("input")
    );
    newAdvance["updateMarkupValue"] = jest.fn();
    newAdvance["setComponentElement"] = jest.fn();
    newAdvance["automateLight"] = jest.fn();
    newAdvance["getComponentData"] = jest.fn().mockReturnValue(componentData);
    newAdvance["componentsData"] = { livingroom: componentData };
  });

  test("displayCustomization toggles hidden", () => {
    const element = document.createElement("button");
    (newAdvance as any).displayCustomization(element);
    expect(newAdvance["toggleHidden"]).toHaveBeenCalled();
  });

  test("closeModalPopUp removes advanced_features and hides parent", () => {
    const container = document.querySelector(".advanced_features_container");
    const modal = document.createElement("div");
    modal.classList.add("advanced_features");
    document.body.appendChild(modal);

    (newAdvance as any).closeModalPopUp();

    expect(document.querySelector(".advanced_features")).toBeNull();
    expect(newAdvance["addHidden"]).toHaveBeenCalledWith(container);
  });

  test("customizationCancelled clears input", () => {
    const input = document.createElement("input");
    input.value = "12:00";
    newAdvance["closestSelector"] = jest.fn(() => input);

    (newAdvance as any).customizationCancelled(input, ".defaultOff");
    expect(input.value).toBe("");
  });

  test("customizeAutomaticOnPreset updates component and UI", () => {
    const button = document.createElement("button");
    const input = document.createElement("input");
    input.value = "07:00";

    newAdvance["closestSelector"] = jest.fn(() => input);
    newAdvance.customizeAutomaticOnPreset(button);

    expect(componentData.autoOn).toBe("07:00");
    expect(newAdvance["updateMarkupValue"]).toHaveBeenCalled();
    expect(newAdvance["automateLight"]).toHaveBeenCalled();
  });

  test("customizeAutomaticOffPreset updates component and UI", () => {
    const button = document.createElement("button");
    const input = document.createElement("input");
    input.value = "20:00";

    newAdvance["closestSelector"] = jest.fn(() => input);
    newAdvance.customizeAutomaticOffPreset(button);

    expect(componentData.autoOff).toBe("20:00");
    expect(newAdvance["updateMarkupValue"]).toHaveBeenCalled();
    expect(newAdvance["automateLight"]).toHaveBeenCalled();
  });

  test("getSelectedComponent returns correct component", () => {
    const result = newAdvance.getSelectedComponent("bathroom");
  });

  test("getSelectedSettings returns markup string", () => {
    const result = newAdvance.getSelectedSettings("bathroom");
    expect(typeof result).toBe("string");
  });

  test("capFirstLetter capitalizes correctly", () => {
    const result = newAdvance.capFirstLetter("bedroom");
    expect(result).toBe("Bedroom");
  });

  test("formatTime returns Date object with correct time", () => {
    const date = newAdvance.formatTime("08:15");
    expect(date.getHours()).toBe(8);
    expect(date.getMinutes()).toBe(15);
  });

  test("timeDifference returns a number", () => {
    const diff = newAdvance.timeDifference("23:59");
    expect(typeof diff).toBe("number");
  });
});
