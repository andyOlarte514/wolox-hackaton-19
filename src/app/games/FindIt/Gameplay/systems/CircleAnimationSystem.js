const MAX_RADIUS = 50;
const PIXELS_PER_SECOND = 25;

function CircleAnimationSystem(entities, { time }) {
  const touchArea = entities[1];
  if (touchArea) {
    const growth = PIXELS_PER_SECOND  * ((touchArea.passingTime * touchArea.passingTime) + time.delta) / 1000;
    if (touchArea.open) {
      touchArea.radius = Math.min(MAX_RADIUS, touchArea.radius + growth);
    } else {
      touchArea.radius = Math.max(0, touchArea.radius - growth);
    }
  }
  return entities;
}

export default CircleAnimationSystem;
