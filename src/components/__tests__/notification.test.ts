import { mount } from '@vue/test-utils'
import { describe, expect, it } from "vitest";
import Notification from "../Notification.vue";

describe("Notification.vue", () => {
  it("renders the correct style for error", () => {
      const type = "error";
      const wrapper = mount(Notification, { 
          props: { type },
      });
      // console.log(1,wrapper.classes())
      // console.log(2,expect.arrayContaining(["notification--error"]).sample[0])
      expect(wrapper.classes()[1]).toEqual("notification--error"); // 测试是否包含某个样式
          
      
  });

  // it("renders the correct style for success", () => {
  //     const type = "success";
  //     const wrapper = mount(Notification, {
  //         props: { type },
  //     });
  //     expect(wrapper.classes()).toEqual(
  //         expect.arrayContaining(["Notification--success"])
  //     );
  // });

  // it("renders the correct style for info", () => {
  //     const type = "info";
  //     const wrapper = mount(Notification, {
  //         props: { type },
  //     });
  //     expect(wrapper.classes()).toEqual(
  //         expect.arrayContaining(["Notification--info"])
  //     );
  // });

  // it("slides down when message is not empty", () => {
  //     const message = "success";
  //     const wrapper = mount(Notification, {
  //         props: { message },
  //     });
  //     expect(wrapper.classes()).toEqual(
  //         expect.arrayContaining(["Notification--slide"])
  //     );
  // });

  // it("slides up when message is empty", () => {
  //     const message = "";
  //     const wrapper = mount(Notification, {
  //         props: { message },
  //     });
  //     expect(wrapper.classes("Notification--slide")).toBe(false); // 判断某个class样式是否存在
  // });

  // it("emits event when close button is clicked", async() => {
  //     const wrapper = mount(Notification, {
  //         data() {
  //             return {
  //                 clicked: false,
  //             };
  //         },
  //     });
  //     const closeButton = wrapper.find("button");
  //     await closeButton.trigger("click");
  //     expect(wrapper.emitted()).toHaveProperty("clear-Notification");
  // });

  // it("renders message when message is not empty", () => {
  //     const message = "Something happened, try again";
  //     const wrapper = mount(Notification, {
  //         props: { message },
  //     });
  //     expect(wrapper.find("p").text()).toBe(message); // 判断页面内容
  // });
});