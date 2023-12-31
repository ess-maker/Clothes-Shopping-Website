import { bar } from "../../../content"
import { useNavigate } from "react-router-dom"

const Bar = () => {

    const Navigate = useNavigate();

  return (
      <ul>
        {bar.map((ele , index) => (
          <li onClick={() => Navigate(ele.path)} key={index} className={`bar_element${index}`}>
            <h1>{ele.titel}</h1>
            <img src={ele.icon} alt="icon" />
            </li>
        ))}
      </ul>
  )
}

export default Bar