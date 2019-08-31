function PressSystem(entities, { touches, time }) {
  const touchArea = entities[1];
  const selectedTouches = touchArea.touchId ? touches.filter(t => t.id === touchArea.touchId) : touches;
  selectedTouches.forEach(firstTouch => {
    if (touchArea) {
      switch (firstTouch.type) {
        case 'start': {
          firstTouch.id;
          const { pageX, pageY } = firstTouch.event;
          touchArea.open = true;
          touchArea.touchId = firstTouch.id;
          touchArea.x = pageX;
          touchArea.y = pageY;
          touchArea.radius = 0;
          touchArea.passingTime = 0;
          break;
        }
        case 'move': {
          const { pageX, pageY } = firstTouch.event;
          touchArea.x = pageX;
          touchArea.y = pageY;
          break;
        }
        case 'end': {
          touchArea.open = false;
          touchArea.passingTime = 0;
          touchArea.touchId = null;
          break;    
        }
      }
      touchArea.passingTime += time.delta;
    }
  });
  return entities;
}

export default PressSystem;
