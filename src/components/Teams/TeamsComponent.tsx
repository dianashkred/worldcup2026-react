import styled from "styled-components"
import type { Team } from "../../Types/Team"
import Button from "../Button/Button"

type TeamsComponentProps = {
    team: Team

}

export default function TeamsComponent({ team }: TeamsComponentProps) {
    return (
        <span>
            <div>
            {team.flag} {team.name} Group: {team.group.name} Confederation:{team.confederation}
            <Button label="Show Matches" to={`/matches?team=${team.id}`} />
            </div>
        </span>
    )

}

