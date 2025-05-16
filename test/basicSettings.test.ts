import Light from "./../js/basicSettings";

describe("Light Class", () => {
  let newlight: Light;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="rooms">
        <div class="bedroom">
          <p>Bedroom</p>
          <div class="light-switch">
            <img class="light-icon" src="./assets/svgs/light_bulb_off.svg" data-lightOn="./assets/svgs/light_bulb.svg" />
          </div>
          <img class="background" />
          <input id="light_intensity" type="range" value="0" />
        </div>
      </div>
    `;

    newlight = new Light();
  });

  test("should return correct custom notification HTML", () => {
    const message = "MY message";
    const html = newlight.notification(message);
    expect(html).toContain(message);
    expect(html).toContain("img");
  });

  test("should display notification in container", () => {
    const container = document.createElement("div");

    const spyNotification = jest.spyOn(newlight, "notification");
    newlight.displayNotification("Coding Rocks", "beforeend", container);
    expect(container.innerHTML).toContain("Coding Rocks");
    expect(container.innerHTML).toContain("notification");

    expect(spyNotification).toHaveBeenCalledWith("Coding Rocks");
  });

  test("should remove notification element after 5 seconds", () => {
    jest.useFakeTimers();
    const element = document.createElement("div");
    document.body.appendChild(element);

    newlight.removeNotification(element);
    expect(document.body.contains(element)).toBe(true);

    jest.advanceTimersByTime(5000);
    expect(document.body.contains(element)).toBe(false);
    jest.useRealTimers();
  });

  test("should turn light switch ON and update attributes", () => {
    const img = document.querySelector(".light-icon") as HTMLElement;
    newlight.lightSwitchOn(img);
    expect(img.getAttribute("src")).toBe("./assets/svgs/light_bulb.svg");
    expect(img.getAttribute("data-lightOn")).toBe(
      "./assets/svgs/light_bulb_off.svg"
    );
  });

  test("should turn light switch OFF and update attributes", () => {
    const img = document.querySelector(".light-icon") as HTMLElement;
    newlight.lightSwitchOff(img);
    expect(img.getAttribute("src")).toBe("./assets/svgs/light_bulb_off.svg");
    expect(img.getAttribute("data-lightOn")).toBe(
      "./assets/svgs/light_bulb.svg"
    );
  });

  test("should toggle light ON and update DOM/slider when light is off", () => {
    const button = document.querySelector(".light-switch") as HTMLElement;
    const p = document.querySelector(".bedroom p")!;
    const img = button.querySelector("img") as HTMLElement;
    const background = document.querySelector(".background") as HTMLElement;
    const slider = document.querySelector(
      "#light_intensity"
    ) as HTMLInputElement;

    p.textContent = "Bedroom";
    newlight.toggleLightSwitch(button);

    expect(img.getAttribute("src")).toBe("./assets/svgs/light_bulb.svg");
    expect(slider.value).toBe("5");
  });

  test("should toggle light OFF and reset intensity to 0", () => {
    const button = document.querySelector(".light-switch") as HTMLElement;
    const p = document.querySelector(".bedroom p")!;
    const slider = document.querySelector(
      "#light_intensity"
    ) as HTMLInputElement;

    p.textContent = "Bedroom";

    newlight.toggleLightSwitch(button);
    newlight.toggleLightSwitch(button);

    expect(slider.value).toBe("0");
  });

  test("should handle light intensity slider change", () => {
    const button = document.querySelector(".light-switch") as HTMLElement;
    const p = document.querySelector(".bedroom p")!;
    p.textContent = "Bedroom";

    const spyLightComponenentSelectors = jest.spyOn(
      newlight,
      "lightComponentSelectors"
    );

    newlight.handleLightIntensitySlider(button, 7);

    const data = newlight.getComponent("bedroom");
    expect(data?.lightIntensity).toBe(7);
    expect(data?.isLightOn).toBe(true);
    expect(spyLightComponenentSelectors).toHaveBeenCalledWith(button);
    expect(spyLightComponenentSelectors).toHaveBeenCalledTimes(2);
  });

  test("should turn off light when slider is set to 0", () => {
    const button = document.querySelector(".light-switch") as HTMLElement;
    const p = document.querySelector(".bedroom p")!;
    p.textContent = "Bedroom";

    newlight.handleLightIntensitySlider(button, 0);

    const data = newlight.getComponent("bedroom");
    expect(data?.lightIntensity).toBe(0);
    expect(data?.isLightOn).toBe(false);
  });
});
