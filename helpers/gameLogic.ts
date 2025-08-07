import type { GameSet, Team } from "@/stores/matchSlice";

export function getSetScore(set: GameSet, teamA: Team, teamB: Team) {
  let teamAScore = 0;
  let teamBScore = 0;

  set.events.forEach((event) => {
    if (event.team.id === teamA.id) {
      teamAScore++;
    }

    if (event.team.id === teamB.id) {
      teamBScore++;
    }
  });

  return { teamA: teamAScore, teamB: teamBScore };
}

export function teamHasWon(teamId: string, set: GameSet, pointsToWin: number) {
  return (
    set.events.filter((event) => event.team.id === teamId).length ===
    pointsToWin
  );
}

export function getAllSetScores(
  sets: GameSet[],
  teamA: Team,
  teamB: Team,
  pointsToWin: number
) {
  let teamASetScore = 0;
  let teamBSetScore = 0;

  sets.forEach((set) => {
    const { teamA: teamAScore, teamB: teamBScore } = getSetScore(
      set,
      teamA,
      teamB
    );

    if (
      teamHasWon(teamA.id, set, pointsToWin) ||
      teamHasWon(teamB.id, set, pointsToWin)
    ) {
      if (teamAScore > teamBScore) {
        teamASetScore++;
      } else if (teamBScore > teamAScore) {
        teamBSetScore++;
      }
    }
  });

  return { teamA: teamASetScore, teamB: teamBSetScore };
}

export function getCurrentStreak(sets: GameSet[]) {
  const currentSet = sets[sets.length - 1];

  if (!currentSet) {
    return { teamId: null, streak: 0 };
  }

  if (currentSet.events.length === 0) {
    return { teamId: null, streak: 0 };
  }

  let streak = 1;
  let lastTeamToScoreId =
    currentSet.events[currentSet.events.length - 1].team.id;

  for (let i = currentSet.events.length - 2; i >= 0; i--) {
    const currentEvent = currentSet.events[i];
    if (currentEvent.team.id === lastTeamToScoreId) {
      streak++;
    } else {
      break;
    }
  }

  return { teamId: lastTeamToScoreId, streak };
}
