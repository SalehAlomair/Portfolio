// A retargetable, critically damped spring. Position and velocity survive reversals.
export function createSpring(paint, settled = () => {}, initial = 0) {
  let position = initial,
    velocity = 0,
    target = initial,
    frame = 0,
    last = 0;
  const stiffness = 300,
    damping = 2 * Math.sqrt(stiffness);
  function tick(time) {
    const dt = Math.min((time - (last || time - 16)) / 1000, 0.032);
    last = time;
    // Small integration steps keep the spring stable on slower displays.
    const steps = Math.ceil(dt / 0.008),
      step = dt / steps;
    for (let i = 0; i < steps; i++) {
      velocity +=
        (-stiffness * (position - target) - damping * velocity) * step;
      position += velocity * step;
    }
    paint(position);
    if (Math.abs(position - target) < 0.0005 && Math.abs(velocity) < 0.005) {
      position = target;
      velocity = 0;
      frame = 0;
      last = 0;
      paint(position);
      settled(target);
    } else frame = requestAnimationFrame(tick);
  }
  return {
    to(value, immediate = false) {
      target = value;
      if (immediate) {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
        position = value;
        velocity = 0;
        paint(value);
        settled(value);
      } else if (!frame) frame = requestAnimationFrame(tick);
    },
    stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}
