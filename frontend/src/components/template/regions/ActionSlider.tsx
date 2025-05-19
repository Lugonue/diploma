import { ActionsCarousel } from "../blocks/ActionsCarousel"

type Props = {}

const ActionSlider = (props: Props) => {
  return (
    <div>
      <h4 className="text-center">Популярные товары</h4>
        <ActionsCarousel />
    </div>
  )
}

export default ActionSlider