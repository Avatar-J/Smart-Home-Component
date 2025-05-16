import General from "./../js/general";

describe("General class", () => {
  let newObj: General;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="rooms">
        <p>Bedroom</p>
        
        <div class="child">
          <span id="target">Click me</span>
        </div>
      </div>

      <div class="mess-div">
      </div>

      <div class="kitchen">
      <button class="light-switch">Toggle</button>
    </div>
    `;
    newObj = new General();
  });

  afterEach(() => {
    const messDiv = document.querySelector(".mess-div");
    if (messDiv) messDiv.innerHTML = "";
  });

  test("should set the property of class to default values when object is created", () => {
    expect(newObj.isLightOn).toBe(false);
    expect(newObj.lightIntensity).toBe(5);
  });

  test("should return the correct component data", () => {
    const componentData = newObj.getComponent("hall");
    expect(componentData).toEqual({
      name: "hall",
      lightIntensity: 5,
      numOfLights: 6,
      isLightOn: false,
      autoOn: "06:30",
      autoOff: "22:00",
      usage: [22, 11, 12, 10, 12, 17, 22],
    });
  });

  test("should return wifiConnection array", () => {
    const wifiConnection = newObj.getWifi();
    expect(wifiConnection[0]).toEqual({
      id: 0,
      wifiName: "Inet service",
      signal: "excellent",
    });
  });

  test("closestSelector should return correct child element", () => {
    const element = document.getElementById("target") as HTMLElement;

    const closest = newObj.closestSelector(element, ".rooms", "p");
    expect(closest?.textContent).toBe("Bedroom");
  });

  test("closestSelector should return null if ancestor is not found", () => {
    const testElement = document.createElement("div");
    const result = newObj.closestSelector(testElement, ".rooms", "p");
    expect(result).toBeNull();
  });

  test("getSelectedComponentName returns lowercase text from matching ancestor", () => {
    const spyMethod = jest.spyOn(newObj, "closestSelector");
    const element = document.getElementById("target") as HTMLElement;
    const componentName = newObj.getSelectedComponentName(element);

    expect(spyMethod).toHaveBeenCalledTimes(1);
    expect(spyMethod).toHaveBeenCalledWith(element, ".rooms", "p");
    expect(componentName).toBe("bedroom");
  });

  test("getComponentData should return component data", () => {
    const spyMethod = jest.spyOn(newObj, "getSelectedComponentName");
    const element = document.getElementById("target") as HTMLElement;
    const componentData = newObj.getComponentData(element, ".rooms", "p");
    expect(spyMethod).toHaveBeenCalledTimes(1);
    expect(componentData).toEqual({
      name: "bedroom",
      lightIntensity: 5,
      numOfLights: 3,
      isLightOn: false,
      autoOn: "06:30",
      autoOff: "22:00",
      usage: [18, 5, 7, 5, 6, 6, 18],
    });
  });

  test("should insert HTML into the container at the correct position", () => {
    const container = document.querySelector(".mess-div") as HTMLElement;

    newObj.renderHTML("<p>My messgae</p>", "beforeend", container);

    expect(container.innerHTML).toContain("<p>My messgae</p>");
  });

  test("should return a notification HTML string with the given message", () => {
    const message = "Jummai rocks!";
    const html = newObj.notification(message);

    expect(html).toContain(`<p>${message}</p>`);
  });

  test("displayNotification should insert notification HTML into the container", () => {
    const spyNotification = jest.spyOn(newObj, "notification");
    const spyRenderHTML = jest.spyOn(newObj, "notification");

    const container = document.createElement("div");
    const message = "Jummai rocks!";

    newObj.displayNotification(message, "beforeend", container);

    expect(spyNotification).toHaveBeenCalledTimes(1);
    expect(spyRenderHTML).toHaveBeenCalledTimes(1);
    expect(container.querySelector(".notification")).not.toBeNull();
    expect(container.textContent).toContain(message);
  });

  test("should remove notification after 2 seconds", () => {
    jest.useFakeTimers();
    const container = document.querySelector(".mess-div") as HTMLElement;

    expect(document.body.contains(container)).toBe(true);

    newObj.removeNotification(container);
    expect(document.body.contains(container)).toBe(true);
    jest.advanceTimersByTime(2000);
    expect(document.body.contains(container)).toBe(false);
    jest.useRealTimers();
  });

  test("handlelightIntensity should set the brightness filter on the element", () => {
    const container = document.querySelector(".rooms") as HTMLElement;

    newObj.handleLightIntensity(container, 0.5);
    expect(container.style.filter).toBe("brightness(0.5)");
  });

  test("updateMarkup should update the text content of the element", () => {
    const element = document.createElement("div");

    newObj.updateMarkupValue(element, "I rule the world");
    expect(element.textContent).toBe("I rule the world");
  });

  test("should set the element property of ComponentData if found", () => {
    const spyFormatTextToClassName = jest.spyOn(
      newObj,
      "formatTextToClassName"
    );
    const roomData = {
      name: "guest room",
      lightIntensity: 5,
      numOfLights: 4,
      isLightOn: false,
      autoOn: "06:30",
      autoOff: "22:00",
      usage: [12, 10, 3, 9, 5, 5, 18],
    };

    newObj.setComponentElement(roomData);

    expect(spyFormatTextToClassName).toHaveBeenCalledTimes(1);
  });
});
