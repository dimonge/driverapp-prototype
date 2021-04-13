import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { BottomSheet } from "./bottom-sheet"
import { ListItem } from "react-native-elements"

declare let module
const list = [
  { title: "List Item 1" },
  { title: "List Item 2" },
  {
    title: "Cancel",
    containerStyle: { backgroundColor: "red" },
    titleStyle: { color: "white" },
    onPress: () => console.log(false),
  },
]

storiesOf("BottomSheet", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Show bottom sheet", () => (
    <Story>
      <UseCase
        text="ButtonSheet"
        usage="Show bottom sheet. Note: set isVisible=true to view the bottom sheet (bottom-sheet.story)"
      >
        <BottomSheet>
          {list.map((l, i) => (
            <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </UseCase>
    </Story>
  ))
