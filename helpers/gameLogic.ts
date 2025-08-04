import { GameSet, Team } from "@/stores/useGameStore";

export function getSetScore(set: GameSet, teamA: Team, teamB: Team) {
  let teamAScore = 0;
  let teamBScore = 0;

  set.events.forEach((event) => {
    if (event.team.id === teamA.id) {
      teamAScore++;
    } else if (event.team.id === teamB.id) {
      teamBScore++;
    }
  });

  return { teamA: teamAScore, teamB: teamBScore };
}

export function getAllSetScores(sets: GameSet[], teamA: Team, teamB: Team) {
  let teamASetScore = 0;
  let teamBSetScore = 0;

  sets.forEach((set) => {
    const { teamA: teamAScore, teamB: teamBScore } = getSetScore(
      set,
      teamA,
      teamB
    );

    if (teamAScore > teamBScore) {
      teamASetScore++;
    } else if (teamBScore > teamAScore) {
      teamBSetScore++;
    }
  });

  return { teamA: teamASetScore, teamB: teamBSetScore };
}
