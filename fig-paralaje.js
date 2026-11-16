/* Figura generada con el kit de Anatomy (MIT, github.com/wheresryan22/anatomy). No editar a mano. */
(function () {
const AZIMUTH = 45;
const ELEVATION = 30;
const SHADES = 4;
const RADIANS = Math.PI / 180;
const UNIT = Math.sqrt(1.6);
function cameraOf({ scale, azimuth = AZIMUTH, elevation = ELEVATION }) {
    const a = azimuth * RADIANS;
    const e = elevation * RADIANS;
    return { sinA: Math.sin(a), cosA: Math.cos(a), sinE: Math.sin(e), cosE: Math.cos(e), k: scale * UNIT };
}
function iso([x, y, z], projection) {
    const { origin } = projection;
    const { sinA, cosA, sinE, cosE, k } = cameraOf(projection);
    return [origin[0] + (x * sinA - y * cosA) * k, origin[1] + ((x * cosA + y * sinA) * sinE - z * cosE) * k];
}
function towardViewer(projection) {
    const { sinA, cosA } = cameraOf(projection);
    return [cosA, sinA];
}
function depthOf([x, y, z], projection) {
    const { sinA, cosA, sinE, cosE } = cameraOf(projection);
    return (x * cosA + y * sinA) * cosE + z * sinE;
}
const tenth = (value) => {
    const text = (Math.round(value * 10) / 10).toFixed(1).replace(/\.0$/, "");
    return text === "-0" ? "0" : text;
};
function pathOf(points, closed = false) {
    if (!points.length)
        return "";
    return points.map(([x, y], at) => `${at ? "L" : "M"}${tenth(x)} ${tenth(y)}`).join("") + (closed ? "Z" : "");
}
const joinPaths = (paths) => paths.filter(Boolean).join("");
function roundedPlan({ x, y, w, d, r }, steps = 8) {
    const radius = Math.max(0, Math.min(r, w / 2, d / 2));
    const corners = [
        [x + w - radius, y + radius, -90],
        [x + w - radius, y + d - radius, 0],
        [x + radius, y + d - radius, 90],
        [x + radius, y + radius, 180],
    ];
    const out = [];
    for (const [cx, cy, start] of corners) {
        const count = radius > 0 ? steps : 0;
        for (let step = 0; step <= count; step++) {
            const angle = (start + (count ? (90 * step) / count : 45)) * RADIANS;
            out.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
        }
    }
    return out;
}
function signedArea(points) {
    let area = 0;
    for (let index = 0; index < points.length; index++) {
        const [ax, ay] = points[index];
        const [bx, by] = points[(index + 1) % points.length];
        area += ax * by - bx * ay;
    }
    return area / 2;
}
const oriented = (points) => (signedArea(points) < 0 ? [...points].reverse() : points);
function convexHull(points) {
    const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    if (sorted.length < 3)
        return sorted;
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lower = [];
    for (const point of sorted) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0)
            lower.pop();
        lower.push(point);
    }
    const upper = [];
    for (let index = sorted.length - 1; index >= 0; index--) {
        const point = sorted[index];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0)
            upper.pop();
        upper.push(point);
    }
    return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}
function runsOf(flags, want) {
    const count = flags.length;
    const runs = [];
    const start = flags.findIndex((flag, index) => flag !== flags[(index + count - 1) % count]);
    if (start < 0)
        return flags[0] === want ? [Array.from({ length: count + 1 }, (_, index) => index % count)] : [];
    let run = null;
    for (let step = 0; step < count; step++) {
        const index = (start + step) % count;
        if (flags[index] === want) {
            if (!run)
                run = [index];
            run.push((index + 1) % count);
        }
        else if (run) {
            runs.push(run);
            run = null;
        }
    }
    if (run)
        runs.push(run);
    return runs;
}
function extrude(ring, z, height, projection, options = {}) {
    const convex = options.convex ?? true;
    const count = ring.length;
    const counter = signedArea(ring) > 0;
    const [vx, vy] = towardViewer(projection);
    const { sinA, cosA } = cameraOf(projection);
    const normals = ring.map(([ax, ay], index) => {
        const [bx, by] = ring[(index + 1) % count];
        const dx = bx - ax;
        const dy = by - ay;
        const length = Math.hypot(dx, dy) || 1;
        return (counter ? [dy / length, -dx / length] : [-dy / length, dx / length]);
    });
    const facing = normals.map(([nx, ny]) => nx * vx + ny * vy > 1e-9);
    const top = ring.map(([x, y]) => iso([x, y, z + height], projection));
    const bottom = ring.map(([x, y]) => iso([x, y, z], projection));
    const outline = [];
    const crease = [];
    for (const run of runsOf(facing, false))
        outline.push(pathOf(run.map((index) => top[index])));
    for (const run of runsOf(facing, true)) {
        crease.push(pathOf(run.map((index) => top[index])));
        if (height > 0)
            outline.push(pathOf(run.map((index) => bottom[index])));
    }
    if (height > 0) {
        for (let index = 0; index < count; index++) {
            if (facing[(index + count - 1) % count] !== facing[index])
                outline.push(pathOf([top[index], bottom[index]]));
        }
    }
    let fill;
    if (convex) {
        fill = pathOf(convexHull([...top, ...bottom]), true);
    }
    else {
        const parts = [pathOf(oriented(top), true), pathOf(oriented(bottom), true)];
        for (let index = 0; index < count; index++) {
            if (!facing[index])
                continue;
            const next = (index + 1) % count;
            parts.push(pathOf(oriented([top[index], top[next], bottom[next], bottom[index]]), true));
        }
        fill = parts.join("");
    }
    const buckets = Array.from({ length: SHADES }, () => []);
    if (height > 0) {
        const [lx, ly] = [-sinA, cosA];
        for (let index = 0; index < count; index++) {
            if (!facing[index])
                continue;
            const [nx, ny] = normals[index];
            const lit = (nx * lx + ny * ly + 1) / 2;
            const shade = Math.min(SHADES - 1, Math.max(0, Math.floor(lit * SHADES)));
            const next = (index + 1) % count;
            buckets[shade].push(pathOf(oriented([top[index], top[next], bottom[next], bottom[index]]), true));
        }
    }
    let bevel;
    if (options.bevel && options.bevel > 0) {
        const by = options.bevel;
        const inset = ring.map(([x, y], index) => {
            const [ax, ay] = normals[(index + count - 1) % count];
            const [bx, by2] = normals[index];
            const mx = ax + bx;
            const my = ay + by2;
            const length = Math.hypot(mx, my) || 1;
            return [x - (mx / length) * by, y - (my / length) * by];
        });
        const insetTop = inset.map(([x, y]) => iso([x, y, z + height], projection));
        bevel = runsOf(facing, true)
            .map((run) => pathOf([top[run[0]], ...run.slice(1, -1).map((index) => insetTop[index]), top[run[run.length - 1]]]))
            .join("");
    }
    return {
        fill,
        outline: outline.join(""),
        crease: crease.join(""),
        top: pathOf(oriented(top), true),
        shades: buckets.map((paths) => paths.join("")),
        bevel,
    };
}
const ringOf = (plan, steps = 8) => roundedPlan(plan, steps);
function slabOf(plan, z, height, projection, steps = 8, bevel = 0) {
    return extrude(ringOf(plan, steps), z, height, projection, { convex: true, bevel });
}
function circleRing(cx, cy, radius, steps = 40) {
    return Array.from({ length: steps }, (_, step) => {
        const angle = (step / steps) * Math.PI * 2;
        return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
    });
}
function cylinder(cx, cy, radius, z, height, projection, steps = 32, bevel = 0) {
    return extrude(circleRing(cx, cy, radius, steps), z, height, projection, { convex: true, bevel });
}
const insetPlan = ({ x, y, w, d, r }, by) => ({ x: x + by, y: y + by, w: w - by * 2, d: d - by * 2, r: Math.max(0, r - by) });
function onTop(points, z, projection, closed = false) {
    return pathOf(points.map(([x, y]) => iso([x, y, z], projection)), closed);
}
const planOutline = (plan, z, projection, steps = 8) => onTop(ringOf(plan, steps), z, projection, true);
const lineOnTop = (from, to, z, projection) => onTop([from, to], z, projection);
const segment = (from, to, projection) => pathOf([iso(from, projection), iso(to, projection)]);
const rise = (at, from, to, projection) => segment([at[0], at[1], from], [at[0], at[1], to], projection);
const ring = (cx, cy, radius, z, projection, steps = 40) => onTop(circleRing(cx, cy, radius, steps), z, projection, true);
const pointsAt = (points, projection) => points.map((point) => iso(point, projection));
function dotGrid(x, y, columns, rows, gap, z, projection) {
    const dots = [];
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++)
            dots.push(iso([x + column * gap, y + row * gap, z], projection));
    }
    return dots;
}
function corners({ x, y, w, d }, inset = 0) {
    return [
        [x + inset, y + inset],
        [x + w - inset, y + inset],
        [x + inset, y + d - inset],
        [x + w - inset, y + d - inset],
    ];
}
function boxCorners({ x, y, w, d }, z0, z1) {
    const out = [];
    for (const px of [x, x + w])
        for (const py of [y, y + d])
            for (const z of [z0, z1])
                out.push([px, py, z]);
    return out;
}
function knurl(cx, cy, radius, z0, z1, count, projection, inset = 0.4) {
    const [vx, vy] = towardViewer(projection);
    const lines = [];
    for (let index = 0; index < count; index++) {
        const angle = (index / count) * Math.PI * 2;
        const nx = Math.cos(angle);
        const ny = Math.sin(angle);
        if (nx * vx + ny * vy < 0.15)
            continue;
        lines.push(segment([cx + radius * nx, cy + radius * ny, z0 + inset], [cx + radius * nx, cy + radius * ny, z1 - inset], projection));
    }
    return lines.join("");
}
function sideArc(cx, cy, radius, z, projection, steps = 24) {
    const [vx, vy] = towardViewer(projection);
    const facing = Math.atan2(vy, vx);
    const points = [];
    for (let step = 0; step <= steps; step++) {
        const angle = facing - Math.PI / 2 + (step / steps) * Math.PI;
        points.push(iso([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle), z], projection));
    }
    return pathOf(points);
}
function ringSeam(ring, z, projection) {
    const count = ring.length;
    const counter = signedArea(ring) > 0;
    const [vx, vy] = towardViewer(projection);
    const facing = ring.map(([ax, ay], index) => {
        const [bx, by] = ring[(index + 1) % count];
        const dx = bx - ax;
        const dy = by - ay;
        const [nx, ny] = counter ? [dy, -dx] : [-dy, dx];
        return nx * vx + ny * vy > 1e-9;
    });
    return runsOf(facing, true).map((run) => pathOf(run.map((index) => iso([ring[index][0], ring[index][1], z], projection)))).join("");
}
const sideSeam = (plan, z, projection, steps = 8) => ringSeam(ringOf(plan, steps), z, projection);
function sideRing(center, radius, axis, projection, steps = 20) {
    const [px, py, pz] = center;
    const points = [];
    for (let step = 0; step < steps; step++) {
        const angle = (step / steps) * Math.PI * 2;
        const u = radius * Math.cos(angle);
        const v = radius * Math.sin(angle);
        points.push(iso(axis === "x" ? [px, py + u, pz + v] : [px + u, py, pz + v], projection));
    }
    return pathOf(points, true);
}
function coil(from, to, center, radius, turns, axis, projection, perTurn = 16) {
    const count = Math.max(1, Math.round(turns * perTurn));
    const back = [];
    const front = [];
    let run = [];
    let near = null;
    for (let index = 0; index <= count; index++) {
        const share = index / count;
        const angle = share * turns * Math.PI * 2;
        const u = radius * Math.cos(angle);
        const v = radius * Math.sin(angle);
        const along = from + (to - from) * share;
        const point = axis === "x" ? [along, center[0] + u, center[1] + v] : [center[0] + u, along, center[1] + v];
        const normal = axis === "x" ? [0, Math.cos(angle), Math.sin(angle)] : [Math.cos(angle), 0, Math.sin(angle)];
        const facing = depthOf(normal, projection) > 0;
        const flat = iso(point, projection);
        if (near === null)
            near = facing;
        if (facing !== near) {
            run.push(flat);
            (near ? front : back).push(pathOf(run));
            run = [flat];
            near = facing;
            continue;
        }
        run.push(flat);
    }
    if (run.length > 1)
        (near ? front : back).push(pathOf(run));
    return { back: back.join(""), front: front.join("") };
}
function topTicks(from, to, step, every, edge, z, lengths, projection, axis = "x") {
    const minor = [];
    const major = [];
    const first = Math.ceil(from / step) * step;
    for (let at = first, index = Math.round(first / step); at <= to + 1e-9; at += step, index++) {
        const big = index % every === 0;
        const length = big ? lengths[1] : lengths[0];
        const a = axis === "x" ? [at, edge] : [edge, at];
        const b = axis === "x" ? [at, edge + length] : [edge + length, at];
        (big ? major : minor).push(lineOnTop(a, b, z, projection));
    }
    return { minor: minor.join(""), major: major.join("") };
}
function sideTicks(from, to, step, every, face, top, lengths, projection, axis = "x") {
    const minor = [];
    const major = [];
    const first = Math.ceil(from / step) * step;
    for (let at = first, index = Math.round(first / step); at <= to + 1e-9; at += step, index++) {
        const big = index % every === 0;
        const length = big ? lengths[1] : lengths[0];
        const a = axis === "x" ? [at, face, top] : [face, at, top];
        const b = axis === "x" ? [at, face, top - length] : [face, at, top - length];
        (big ? major : minor).push(segment(a, b, projection));
    }
    return { minor: minor.join(""), major: major.join("") };
}
function radialTicks(cx, cy, radius, count, every, z, lengths, projection, from = 0, span = Math.PI * 2) {
    const minor = [];
    const major = [];
    const closed = Math.abs(span - Math.PI * 2) < 1e-9;
    const steps = closed ? count : count + 1;
    for (let index = 0; index < steps; index++) {
        const angle = from + (index / count) * span;
        const big = index % every === 0;
        const inner = radius - (big ? lengths[1] : lengths[0]);
        const sx = Math.sin(angle);
        const sy = -Math.cos(angle);
        (big ? major : minor).push(lineOnTop([cx + sx * inner, cy + sy * inner], [cx + sx * radius, cy + sy * radius], z, projection));
    }
    return { minor: minor.join(""), major: major.join("") };
}
const haloOf = (plan, z, height, projection) => slabOf(plan, z, height, projection).fill;
function axisVector(projection, [dx, dy, dz]) {
    const origin = iso([0, 0, 0], projection);
    const moved = iso([dx, dy, dz], projection);
    return [moved[0] - origin[0], moved[1] - origin[1]];
}
const fine = (value) => Math.round(value * 100) / 100;
function translateAlong(projection, by) {
    const [x, y] = axisVector(projection, by);
    return `translate(${fine(x)} ${fine(y)})`;
}
const thousandth = (value) => Math.round(value * 1000) / 1000;
function axesAt(at, z, projection) {
    const origin = iso([at[0], at[1], z], projection);
    const along = (point) => {
        const [px, py] = iso(point, projection);
        return [px - origin[0], py - origin[1]];
    };
    return { origin, x: along([at[0] + 1, at[1], z]), y: along([at[0], at[1] + 1, z]), z: along([at[0], at[1], z + 1]) };
}
const matrixOf = (u, v, origin) => `matrix(${thousandth(u[0])} ${thousandth(u[1])} ${thousandth(v[0])} ${thousandth(v[1])} ${thousandth(origin[0])} ${thousandth(origin[1])})`;
function holdStill(element, [dx, dy]) {
    const text = dx || dy ? `translate(${-dx} ${-dy})` : "";
    element.querySelectorAll("[data-hold]").forEach((node) => (text ? node.setAttribute("transform", text) : node.removeAttribute("transform")));
}
function topMatrix(at, z, projection, along = "x") {
    const { origin, x, y } = axesAt(at, z, projection);
    return along === "x" ? matrixOf(x, y, origin) : matrixOf([-y[0], -y[1]], x, origin);
}
function sideMatrix(at, z, projection, face) {
    const { origin, x, y, z: up } = axesAt(at, z, projection);
    const down = [-up[0], -up[1]];
    return face === "left" ? matrixOf(x, down, origin) : matrixOf([-y[0], -y[1]], down, origin);
}
function screenRise(height, projection) {
    const { cosE, k } = cameraOf(projection);
    return height * cosE * k;
}
function fitProjection(points, width, height, { pad = 24, headroom = 0, azimuth = AZIMUTH, elevation = ELEVATION } = {}) {
    const unit = { origin: [0, 0], scale: 1, azimuth, elevation };
    const flat = points.map((point) => iso(point, unit));
    const xs = flat.map(([x]) => x);
    const ys = flat.map(([, y]) => y);
    const left = Math.min(...xs);
    const right = Math.max(...xs);
    const up = Math.min(...ys);
    const down = Math.max(...ys);
    const scale = Math.min((width - pad * 2) / (right - left), (height - pad * 2 - headroom) / (down - up));
    return {
        origin: [width / 2 - ((left + right) / 2) * scale, headroom + (height - headroom) / 2 - ((up + down) / 2) * scale],
        scale,
        azimuth,
        elevation,
    };
}
const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attrs = (pairs) => Object.entries(pairs)
    .filter(([, value]) => value !== undefined && value !== false)
    .map(([key, value]) => ` ${key}="${escape(String(value))}"`)
    .join("");
function solidSvg(paths, { tone = "hi", crease = "faint", halo = false, lit = false, flat = false, className, inner = "" } = {}) {
    const parts = [];
    if (halo)
        parts.push(`<path class="iso-halo" d="${paths.fill}"/>`);
    parts.push(`<path class="iso-fill" d="${paths.fill}"/>`);
    if (!flat) {
        paths.shades.forEach((d, shade) => {
            if (d)
                parts.push(`<path class="iso-shade" data-shade="${shade}" d="${d}"/>`);
        });
        parts.push(`<path class="iso-top" d="${paths.top}"/>`);
    }
    if (crease !== "none" && paths.crease)
        parts.push(`<path class="iso-line iso-crease" data-tone="${crease}" d="${paths.crease}"/>`);
    if (crease !== "none" && paths.bevel)
        parts.push(`<path class="iso-line iso-bevel" data-tone="${crease}" d="${paths.bevel}"/>`);
    if (inner)
        parts.push(inner);
    parts.push(`<path class="iso-line iso-edge" data-tone="${tone}" d="${paths.outline}"/>`);
    return `<g${attrs({ class: className ? `iso-solid ${className}` : "iso-solid", "data-lit": lit ? "" : undefined, "data-seamless": paths.seamless ? "" : undefined })}>${parts.join("")}</g>`;
}
function lineSvg(d, { tone = "lo", dotted = false, dashed = false, flow = false, className, free } = {}) {
    if (!d)
        return "";
    return `<path${attrs({
        class: className ? `iso-line ${className}` : "iso-line",
        "data-tone": tone,
        "data-free": free === true ? "" : free || undefined,
        "data-dotted": dotted ? "" : undefined,
        "data-dashed": dashed ? "" : undefined,
        "data-flow": flow ? "" : undefined,
        d,
    })}/>`;
}
function dotsSvg(points, { size = 0.5, tone = "mid", pulse = false } = {}) {
    const dots = points
        .map(([x, y, alpha], index) => `<circle cx="${tenth(x)}" cy="${tenth(y)}" r="${size}"${alpha !== undefined && alpha < 1 ? ` fill-opacity="${Math.max(0, alpha).toFixed(2)}"` : ""}${pulse ? ` data-pulse="" style="--pulse-at:${(index * 137) % 1600}ms"` : ""}/>`)
        .join("");
    return `<g class="iso-dots" data-tone="${tone}">${dots}</g>`;
}
function fadedSvg(list, style = {}) {
    const groups = new Map();
    for (const entry of list) {
        const [d, alpha] = Array.isArray(entry) ? entry : [entry.d, entry.alpha];
        if (!d || !(alpha > 0.02))
            continue;
        const level = Math.min(1, Math.round(alpha * 20) / 20);
        groups.set(level, (groups.get(level) ?? "") + d);
    }
    return [...groups].map(([alpha, d]) => (alpha >= 1 ? lineSvg(d, style) : `<g opacity="${alpha.toFixed(2)}">${lineSvg(d, style)}</g>`)).join("");
}
function fadeLineSvg(points, { fade = [0, 0], tone = "lo", className, stops = 6 } = {}) {
    if (points.length < 2)
        return "";
    const ease = (t) => t * t * (3 - 2 * t);
    const hashOf = (text) => {
        let hash = 2166136261;
        for (let index = 0; index < text.length; index++)
            hash = Math.imul(hash ^ text.charCodeAt(index), 16777619);
        return (hash >>> 0).toString(36);
    };
    const lengths = [0];
    for (let index = 1; index < points.length; index++)
        lengths.push(lengths[index - 1] + Math.hypot(points[index][0] - points[index - 1][0], points[index][1] - points[index - 1][1]));
    const at = (length) => {
        let index = 1;
        while (index < points.length - 1 && lengths[index] < length)
            index++;
        const span = lengths[index] - lengths[index - 1] || 1;
        const t = Math.max(0, Math.min(1, (length - lengths[index - 1]) / span));
        return [points[index - 1][0] + (points[index][0] - points[index - 1][0]) * t, points[index - 1][1] + (points[index][1] - points[index - 1][1]) * t];
    };
    const pieceOf = (from, to) => [at(from), ...points.filter((_, index) => lengths[index] > from + 1e-6 && lengths[index] < to - 1e-6), at(to)];
    const total = lengths[lengths.length - 1];
    if (total < 1e-6)
        return "";
    let [start, end] = Array.isArray(fade) ? fade : [fade, fade];
    if (start + end > total) {
        const share = total / (start + end);
        start *= share;
        end *= share;
    }
    const paint = `var(--anatomy-${tone})`;
    const ramp = (piece, rising) => {
        const d = pathOf(piece);
        const [x1, y1] = piece[0];
        const [x2, y2] = piece[piece.length - 1];
        const id = `iso-fade-${hashOf(`${d}|${tone}|${rising}`)}`;
        const marks = Array.from({ length: stops + 1 }, (_, index) => {
            const t = index / stops;
            const alpha = ease(rising ? t : 1 - t);
            return `<stop offset="${t.toFixed(3)}" stop-opacity="${alpha.toFixed(3)}" style="stop-color:${paint}"/>`;
        }).join("");
        const gradient = `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${tenth(x1)}" y1="${tenth(y1)}" x2="${tenth(x2)}" y2="${tenth(y2)}">${marks}</linearGradient>`;
        return `<defs>${gradient}</defs><path${attrs({ class: className ? `iso-line ${className}` : "iso-line", "data-tone": tone, "data-free": rising ? "start" : "end", d, style: `stroke:url(#${id})` })}/>`;
    };
    const parts = [];
    if (start > 0.05)
        parts.push(ramp(pieceOf(0, start), true));
    if (total - end - start > 0.05)
        parts.push(lineSvg(pathOf(pieceOf(start, total - end)), { tone, className }));
    if (end > 0.05)
        parts.push(ramp(pieceOf(total - end, total), false));
    return `<g class="iso-fade">${parts.join("")}</g>`;
}
function wireSvg(from, to, { via = [], tone = "lo", dotted = false, dashed = false, flow = false, ends = "both", size = 1.2 } = {}) {
    const d = pathOf([from, ...via, to]);
    const end = ([x, y]) => `<circle class="iso-wire-end" cx="${tenth(x)}" cy="${tenth(y)}" r="${size}"/>`;
    return `<g class="iso-wire" data-tone="${tone}">${lineSvg(d, { tone, dotted, dashed, flow })}${ends === "both" || ends === "from" ? end(from) : ""}${ends === "both" || ends === "to" ? end(to) : ""}</g>`;
}
function faceTextSvg(transform, text, { size = 3, tone = "mid", anchor = "start" } = {}) {
    return `<text class="iso-face-text" data-tone="${tone}" transform="${transform}" font-size="${size}" text-anchor="${anchor}">${escape(text)}</text>`;
}
function groupSvg(children, extra = {}) {
    return `<g${attrs(extra)}>${Array.isArray(children) ? children.join("") : children}</g>`;
}
function figureSvg({ width, height, label, body, standalone = false, className }) {
    const style = standalone ? `<style>${ISO_CSS}</style>` : "";
    return `<svg${attrs({
        xmlns: "http://www.w3.org/2000/svg",
        class: `iso-svg${standalone ? " iso" : ""}${className ? ` ${className}` : ""}`,
        "data-theme": standalone || undefined,
        viewBox: `0 0 ${width} ${height}`,
        role: "img",
        "aria-label": label,
    })}>${style}${Array.isArray(body) ? body.join("") : body}</svg>`;
}
function swatchSvg(mark) {
    if (mark === "raised" || mark === "flat" || mark === "lit") {
        const body = mark === "flat" ? "M2 6.5 8 3.5 14 6.5 8 9.5Z" : "M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z";
        const crease = mark === "flat" ? "" : `<path class="iso-swatch-crease" d="M2 4.5 8 7.5 14 4.5"/>`;
        return `<svg class="iso-swatch" data-mark="${mark}" viewBox="0 0 16 10" aria-hidden="true"><path d="${body}"/>${crease}</svg>`;
    }
    return `<svg class="iso-swatch" data-mark="${mark}" viewBox="0 0 16 10" aria-hidden="true"><path d="M1.5 5h13"/></svg>`;
}
function plateHtml({ fig, title, hint, readout = "", keys = [], caption, body }) {
    const corner = (name, text, extra = "") => `<span class="iso-plate-corner" data-corner="${name}"${extra}>${escape(text)}</span>`;
    const legend = keys.length || caption
        ? `<figcaption class="iso-legend">${keys.length ? `<span class="iso-keys">${keys.map((key) => `<span class="iso-key">${swatchSvg(key.mark)}${escape(key.label)}</span>`).join("")}</span>` : ""}${caption ? `<span class="iso-caption">${escape(caption)}</span>` : ""}</figcaption>`
        : "";
    return `<figure class="iso-figure"><div class="iso-plate"><div class="iso-plate-corners" aria-hidden="true">${corner("fig", fig)}${title ? corner("title", title) : ""}${hint ? corner("hint", hint) : ""}${corner("readout", readout, " data-readout")}</div>${body}</div>${legend}</figure>`;
}
function pageHtml({ title, theme = "dark", body, script = "", width = 650 }) {
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)}</title><style>${ISO_CSS}${PAGE_CSS.replace("__WIDTH__", String(width))}</style></head><body class="iso" data-theme="${theme}"><main class="iso-page">${body}</main>${script ? `<script type="module">${script.replace(/<\/(script)/gi, "<\\/$1")}</script>` : ""}</body></html>`;
}
const PAGE_CSS = `
*{box-sizing:border-box}
html{color-scheme:dark}
body[data-theme="light"]{color-scheme:light}
body{margin:0;background:var(--anatomy-page);color:var(--anatomy-text);font:14px/1.6 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
.iso-page{width:min(__WIDTH__px,100% - 32px);margin:64px auto 96px}
`;
const ISO_CSS = `
.iso{
  --anatomy-page:#0b0b0b;--anatomy-card:#131313;--anatomy-text:#a3a3a3;--anatomy-strong:#e6e6e6;--anatomy-muted:#6e6e6e;
  --anatomy-paper:#131313;--anatomy-face:#1b1b1b;--anatomy-top:#1c1c1c;
  --anatomy-shade-0:#0f0f0f;--anatomy-shade-1:#121212;--anatomy-shade-2:#151515;--anatomy-shade-3:#181818;
  --anatomy-lit-top:#262626;--anatomy-lit-shade:#1d1d1d;
  --anatomy-hi:#d4d4d4;--anatomy-mid:#6a6a6a;--anatomy-lo:#3e3e3e;--anatomy-faint:#2a2a2a;--anatomy-lit:#ffffff;
  --anatomy-halo:#050505;--anatomy-halo-opacity:.9;--anatomy-dot:#e6e6e6;
  --anatomy-red:#ff6b6b;--anatomy-green:#6be0a0;--anatomy-blue:#6b9bff;
  --anatomy-weight:.6px;--anatomy-ease:cubic-bezier(.32,.72,0,1);
  --anatomy-mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  --anatomy-lift:inset 0 1px 0 0 #ffffff0a,inset 0 0 0 1px #ffffff06,0 0 0 1px #00000026,0 1px 1px -.5px #00000014,0 3px 3px -1.5px #00000014,0 6px 6px -3px #00000014,0 12px 12px -6px #00000014;
}
.iso[data-theme="light"]{
  --anatomy-page:#f2f2ef;--anatomy-card:#fbfbfa;--anatomy-text:#57575a;--anatomy-strong:#18181a;--anatomy-muted:#8c8c90;
  --anatomy-paper:#fbfbfa;--anatomy-face:#ffffff;--anatomy-top:#ffffff;
  --anatomy-shade-0:#dcdcd9;--anatomy-shade-1:#e5e5e2;--anatomy-shade-2:#ededea;--anatomy-shade-3:#f4f4f1;
  --anatomy-lit-top:#ffffff;--anatomy-lit-shade:#eeeeeb;
  --anatomy-hi:#26262a;--anatomy-mid:#8a8a8f;--anatomy-lo:#b4b4b8;--anatomy-faint:#d4d4d6;--anatomy-lit:#000000;
  --anatomy-halo:#8a8a80;--anatomy-halo-opacity:.32;--anatomy-dot:#3a3a3e;
  --anatomy-red:#e5484d;--anatomy-green:#30a46c;--anatomy-blue:#3e63dd;
  --anatomy-lift:inset 0 1px 0 0 #ffffff,0 0 0 1px #0000000f,0 1px 1px -.5px #0000000a,0 3px 3px -1.5px #0000000a,0 6px 6px -3px #0000000a,0 12px 12px -6px #0000000a;
}
.iso-svg{display:block;width:100%;height:auto;overflow:visible}
.iso-svg path,.iso-svg circle{vector-effect:non-scaling-stroke}
.iso-fill{fill:var(--anatomy-paper);stroke:none}
.iso-solid[data-lit]>.iso-fill{fill:var(--anatomy-face)}
.iso-shade,.iso-top{stroke:none}
.iso-shade[data-shade="0"]{fill:var(--anatomy-shade-0)}
.iso-shade[data-shade="1"]{fill:var(--anatomy-shade-1)}
.iso-shade[data-shade="2"]{fill:var(--anatomy-shade-2)}
.iso-shade[data-shade="3"]{fill:var(--anatomy-shade-3)}
.iso-top{fill:var(--anatomy-top)}
.iso-solid[data-lit]>.iso-top{fill:var(--anatomy-lit-top)}
.iso-solid[data-lit]>.iso-shade{fill:var(--anatomy-lit-shade)}
.iso-solid[data-seamless]>.iso-shade,.iso-solid[data-seamless]>.iso-top{stroke-width:.4;stroke-linejoin:round}
.iso-solid[data-seamless]>.iso-shade[data-shade="0"]{stroke:var(--anatomy-shade-0)}
.iso-solid[data-seamless]>.iso-shade[data-shade="1"]{stroke:var(--anatomy-shade-1)}
.iso-solid[data-seamless]>.iso-shade[data-shade="2"]{stroke:var(--anatomy-shade-2)}
.iso-solid[data-seamless]>.iso-shade[data-shade="3"]{stroke:var(--anatomy-shade-3)}
.iso-solid[data-seamless]>.iso-top{stroke:var(--anatomy-top)}
.iso-solid[data-seamless][data-lit]>.iso-top{stroke:var(--anatomy-lit-top)}
.iso-solid[data-seamless][data-lit]>.iso-shade{stroke:var(--anatomy-lit-shade)}
.iso-solid[data-lit]>.iso-edge{stroke:var(--anatomy-lit)}
.iso-halo{fill:var(--anatomy-halo);stroke:none;filter:blur(9px);opacity:var(--anatomy-halo-opacity);transform:translateY(3px)}
.iso-line{fill:none;stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight);stroke-linecap:round;stroke-linejoin:round}
.iso-line[data-tone="hi"]{stroke:var(--anatomy-hi)}
.iso-line[data-tone="mid"]{stroke:var(--anatomy-mid)}
.iso-line[data-tone="lo"]{stroke:var(--anatomy-lo)}
.iso-line[data-tone="faint"]{stroke:var(--anatomy-faint)}
.iso-line[data-tone="lit"]{stroke:var(--anatomy-lit)}
.iso-line[data-tone="red"]{stroke:var(--anatomy-red)}
.iso-line[data-tone="green"]{stroke:var(--anatomy-green)}
.iso-line[data-tone="blue"]{stroke:var(--anatomy-blue)}
.iso-line[data-dotted]{stroke-dasharray:.01 3.5;stroke-width:1}
.iso-line[data-dashed]{stroke-dasharray:3 3}
.iso-line[data-flow]{stroke-dasharray:2 6}
.iso-wire-end{fill:var(--anatomy-paper);stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight)}
.iso-wire[data-tone="hi"] .iso-wire-end{stroke:var(--anatomy-hi)}
.iso-wire[data-tone="mid"] .iso-wire-end{stroke:var(--anatomy-mid)}
.iso-wire[data-tone="faint"] .iso-wire-end{stroke:var(--anatomy-faint)}
.iso-wire[data-tone="lit"] .iso-wire-end{stroke:var(--anatomy-lit)}
.iso-dots circle{fill:var(--anatomy-dot);stroke:none;opacity:.32}
.iso-dots[data-tone="hi"] circle{opacity:.85}
.iso-dots[data-tone="mid"] circle{opacity:.45}
.iso-dots[data-tone="lo"] circle{opacity:.22}
.iso-dots[data-tone="faint"] circle{opacity:.12}
.iso-face-text{fill:var(--anatomy-mid);font-family:var(--anatomy-mono);letter-spacing:.04em}
.iso-face-text[data-tone="hi"]{fill:var(--anatomy-hi)}
.iso-face-text[data-tone="lo"]{fill:var(--anatomy-lo)}
.iso-face-text[data-tone="faint"]{fill:var(--anatomy-faint)}
.tb-body{fill:var(--anatomy-shade-2);stroke:none}
.tb-shine{fill:var(--anatomy-top);stroke:none}
.tb-shade{fill:var(--anatomy-shade-0);stroke:none}
.tb-ring{fill:none;stroke:var(--anatomy-lo);stroke-width:.45;stroke-linecap:butt;stroke-linejoin:round}
.tb-ring[data-tone="mid"]{stroke:var(--anatomy-mid)}
.tb-ring[data-tone="faint"]{stroke:var(--anatomy-faint)}
.tb-ring[data-tone="hi"]{stroke:var(--anatomy-hi)}
@keyframes iso-flow{to{stroke-dashoffset:-32}}
@keyframes iso-pulse{0%,100%{opacity:.18}12%{opacity:1}40%{opacity:.18}}
.iso-line[data-flow]{animation:iso-flow 1600ms linear infinite}
.iso-dots circle[data-pulse]{animation:iso-pulse 1600ms steps(1,end) infinite;animation-delay:var(--pulse-at,0ms)}
.iso-figure{margin:32px 0 36px}
.iso-plate{position:relative;padding:52px 24px;border-radius:0;background:var(--anatomy-card);box-shadow:0 0 0 1px var(--anatomy-mid);--anatomy-paper:var(--anatomy-card)}
.iso-plate-corners{position:absolute;inset:18px 20px;pointer-events:none}
.iso-plate-corner{position:absolute;color:var(--anatomy-muted);font-family:var(--anatomy-mono);font-size:10.5px;line-height:1;letter-spacing:.04em;white-space:nowrap}
.iso-plate-corner[data-corner="fig"]{top:0;left:0;color:var(--anatomy-text)}
.iso-plate-corner[data-corner="title"]{top:0;right:0;text-transform:uppercase;letter-spacing:.1em}
.iso-plate-corner[data-corner="hint"]{bottom:0;left:0;text-transform:uppercase;letter-spacing:.1em}
.iso-plate-corner[data-corner="readout"]{right:0;bottom:0;color:var(--anatomy-text);font-variant-numeric:tabular-nums}
.iso-plate .iso-svg{margin:0 auto}
.iso-legend{display:grid;gap:8px;margin-top:12px;color:var(--anatomy-muted);font-size:13px;line-height:1.55}
.iso-keys{display:flex;flex-wrap:wrap;gap:6px 18px}
.iso-key{display:inline-flex;align-items:center;gap:7px}
.iso-swatch{width:16px;height:10px;flex:none;overflow:visible}
.iso-swatch path{fill:none;stroke:var(--anatomy-hi);stroke-width:1;vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}
.iso-swatch[data-mark="raised"] path,.iso-swatch[data-mark="flat"] path{stroke:var(--anatomy-mid)}
.iso-swatch[data-mark="lit"] path{stroke:var(--anatomy-lit)}
.iso-swatch[data-mark="dim"] path{stroke:var(--anatomy-lo)}
.iso-swatch[data-mark="dotted"] path{stroke-dasharray:.01 3;stroke-width:1.4}
.iso-swatch[data-mark="dashed"] path{stroke-dasharray:3 2.5}
.iso-swatch[data-mark="red"] path{stroke:var(--anatomy-red)}
.iso-swatch[data-mark="green"] path{stroke:var(--anatomy-green)}
.iso-swatch[data-mark="blue"] path{stroke:var(--anatomy-blue)}
.iso-swatch-crease{stroke:var(--anatomy-lo)!important}
@media (max-width:560px){.iso-plate{padding:48px 12px 70px}.iso-plate-corner[data-corner="hint"]{bottom:18px}}
@media (prefers-reduced-motion:reduce){.iso-line[data-flow],.iso-dots circle[data-pulse]{animation:none}}
`;

const P = {"origin":[331.1488775602563,184.93239595376295],"scale":1.1185077831547725,"azimuth":52,"elevation":30}, PC = 60, BX = 120, B = 24, XW = -146, ZL = 27.2, DIAL = [98,53], DIAL_R = 13, DIAL_TOP = 13, REACH = [74,240], STARS = [["Próxima Centauri",1.3],["Estrella de Barnard",1.83],["Sirio",2.64],["61 Cygni",3.49]], STOPS = [78,109.80000000000001,158.4,209.4];

const armOf = (sign, s) => {
  const len = Math.hypot(s, B), ux = -s / len, uy = -sign * B / len, px = -uy, py = ux, cx = BX, cy = sign * B;
  const ring = [[-7, -1.7], [20, -1.7], [20, 1.7], [-7, 1.7]].map(([a, w]) => [cx + ux * a + px * w, cy + uy * a + py * w]);
  return solidSvg(extrude(ring, 25, ZL - 25, P, { bevel: 0.3 }), { tone: "hi" }) + dotsSvg([iso([cx, cy, ZL], P)], { size: 0.6, tone: "hi" });
};
const armsAt = (s) => armOf(-1, s) + armOf(1, s);
const wallY = (sign, s) => sign * B * (1 - (BX - XW) / s);
const sightAt = (s) => {
  const star = [BX - s, 0, ZL];
  let out = "";
  for (const sign of [-1, 1]) {
    const hit = [XW, wallY(sign, s), ZL];
    out += lineSvg(segment(star, hit, P), { tone: "mid", dashed: true }) + lineSvg(segment([BX, sign * B, ZL], star, P), { tone: "lit" });
  }
  return out + dotsSvg([-1, 1].map((sign) => iso([XW, wallY(sign, s), ZL], P)), { size: 1.5, tone: "hi" });
};
const needleAt = (turn) => {
  const a = turn * Math.PI * 2, [x, y] = DIAL;
  return lineOnTop([x - Math.sin(a) * 2.6, y + Math.cos(a) * 2.6], [x + Math.sin(a) * (DIAL_R - 3.4), y - Math.cos(a) * (DIAL_R - 3.4)], DIAL_TOP + 0.2, P);
};

const HTML = "<figure class=\"iso-figure\"><div class=\"iso-plate\"><div class=\"iso-plate-corners\" aria-hidden=\"true\"><span class=\"iso-plate-corner\" data-corner=\"fig\">Fig 2.1</span><span class=\"iso-plate-corner\" data-corner=\"title\">Banco de paralaje</span><span class=\"iso-plate-corner\" data-corner=\"hint\">Arrastra o usa las flechas</span><span class=\"iso-plate-corner\" data-corner=\"readout\" data-readout>Sirio · d = 2,64 pc · p = 0,379″</span></div><div class=\"iso-stage\" tabindex=\"0\" role=\"slider\" aria-label=\"Banco de paralaje: las flechas llevan la estrella de una distancia real a otra\" aria-valuemin=\"1,23\" aria-valuemax=\"4,00\" aria-valuenow=\"2,64\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"iso-svg\" viewBox=\"0 0 640 330\" role=\"img\" aria-label=\"Un banco de paralaje. Sobre una placa, una barra representa la órbita de la Tierra, con el Sol en el centro y una mira giratoria en cada extremo. Una varilla iluminada, la estrella, se desliza por dos raíles alejándose de la barra. Las dos miras apuntan siempre a la estrella, y sus líneas de visión siguen hasta una pantalla del fondo cubierta de estrellas lejanas. Cuanto más lejos está la estrella, más se juntan los dos puntos sobre la pantalla y menos marca el dial.\"><path class=\"iso-halo\" d=\"M96.9 161L97.3 159.9L98.1 158.9L99.2 157.9L210.7 86.6L212.3 85.8L214.1 85.1L216.1 84.7L218.3 84.4L220.5 84.4L222.7 84.6L224.8 85L226.6 85.6L538.8 207.5L540.4 208.3L541.7 209.2L542.6 210.2L543.1 211.3L543.1 212.4L543.1 227.1L542.7 228.2L541.9 229.3L540.8 230.2L429.3 301.5L427.7 302.3L425.9 303L423.9 303.4L421.7 303.7L419.5 303.7L417.3 303.5L415.2 303.1L413.4 302.5L101.2 180.6L99.6 179.8L98.3 178.9L97.4 177.9L96.9 176.8L96.9 175.7Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M213.2 116.7L213.4 115.6L214.1 114.6L215.3 113.6L216.8 112.9L218.7 112.3L220.8 111.9L223 111.7L225.2 111.9L227.3 112.2L229.2 112.8L230.8 113.6L232 114.5L232.7 115.5L233 116.6L233 118.6L232.8 119.7L232 120.8L230.9 121.7L229.3 122.5L227.5 123.1L225.4 123.5L223.2 123.6L221 123.5L218.9 123.1L217 122.6L215.4 121.8L214.2 120.9L213.4 119.8L213.2 118.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M230.9 121.7L229.3 122.5L229.3 120.5L230.9 119.7ZM229.3 122.5L227.5 123.1L227.5 121.1L229.3 120.5ZM233 118.6L232.8 119.7L232.8 117.8L233 116.6ZM232.8 119.7L232 120.8L232 118.8L232.8 117.8ZM232 120.8L230.9 121.7L230.9 119.7L232 118.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M227.5 123.1L225.4 123.5L225.4 121.5L227.5 121.1ZM225.4 123.5L223.2 123.6L223.2 121.6L225.4 121.5Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M223.2 123.6L221 123.5L221 121.5L223.2 121.6ZM221 123.5L218.9 123.1L218.9 121.2L221 121.5Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M218.9 123.1L217 122.6L217 120.6L218.9 121.2ZM217 122.6L215.4 121.8L215.4 119.8L217 120.6ZM215.4 121.8L214.2 120.9L214.2 118.9L215.4 119.8ZM214.2 120.9L213.4 119.8L213.4 117.8L214.2 118.9ZM213.4 119.8L213.2 118.7L213.2 116.7L213.4 117.8Z\"/><path class=\"iso-top\" d=\"M230.9 119.7L229.3 120.5L227.5 121.1L225.4 121.5L223.2 121.6L221 121.5L218.9 121.2L217 120.6L215.4 119.8L214.2 118.9L213.4 117.8L213.2 116.7L213.4 115.6L214.1 114.6L215.3 113.6L216.8 112.9L218.7 112.3L220.8 111.9L223 111.7L225.2 111.9L227.3 112.2L229.2 112.8L230.8 113.6L232 114.5L232.7 115.5L233 116.6L232.8 117.8L232 118.8Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M233 116.6L232.8 117.8L232 118.8L230.9 119.7L229.3 120.5L227.5 121.1L225.4 121.5L223.2 121.6L221 121.5L218.9 121.2L217 120.6L215.4 119.8L214.2 118.9L213.4 117.8L213.2 116.7\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M213.2 116.7L213.4 115.6L214.1 114.6L215.3 113.6L216.8 112.9L218.7 112.3L220.8 111.9L223 111.7L225.2 111.9L227.3 112.2L229.2 112.8L230.8 113.6L232 114.5L232.7 115.5L233 116.6M233 118.6L232.8 119.7L232 120.8L230.9 121.7L229.3 122.5L227.5 123.1L225.4 123.5L223.2 123.6L221 123.5L218.9 123.1L217 122.6L215.4 121.8L214.2 120.9L213.4 119.8L213.2 118.7M213.2 116.7L213.2 118.7M233 116.6L233 118.6\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M215.4 112.6L215.6 111.7L216.2 110.9L217.1 110.2L218.3 109.6L219.7 109.1L221.3 108.8L223 108.7L224.7 108.8L226.3 109.1L227.8 109.5L229 110.1L229.9 110.8L230.5 111.6L230.7 112.5L230.7 116.7L230.5 117.5L230 118.3L229.1 119L227.9 119.7L226.5 120.1L224.9 120.4L223.2 120.5L221.5 120.4L219.8 120.2L218.4 119.7L217.2 119.1L216.2 118.4L215.6 117.6L215.4 116.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M229.1 119L227.9 119.7L227.9 115.5L229.1 114.9ZM227.9 119.7L226.5 120.1L226.5 116L227.9 115.5ZM230.7 116.7L230.5 117.5L230.5 113.3L230.7 112.5ZM230.5 117.5L230 118.3L230 114.2L230.5 113.3ZM230 118.3L229.1 119L229.1 114.9L230 114.2Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M226.5 120.1L224.9 120.4L224.9 116.2L226.5 116ZM224.9 120.4L223.2 120.5L223.2 116.4L224.9 116.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M223.2 120.5L221.5 120.4L221.5 116.3L223.2 116.4ZM221.5 120.4L219.8 120.2L219.8 116L221.5 116.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M219.8 120.2L218.4 119.7L218.4 115.5L219.8 116ZM218.4 119.7L217.2 119.1L217.2 114.9L218.4 115.5ZM217.2 119.1L216.2 118.4L216.2 114.2L217.2 114.9ZM216.2 118.4L215.6 117.6L215.6 113.4L216.2 114.2ZM215.6 117.6L215.4 116.7L215.4 112.6L215.6 113.4Z\"/><path class=\"iso-top\" d=\"M229.1 114.9L227.9 115.5L226.5 116L224.9 116.2L223.2 116.4L221.5 116.3L219.8 116L218.4 115.5L217.2 114.9L216.2 114.2L215.6 113.4L215.4 112.6L215.6 111.7L216.2 110.9L217.1 110.2L218.3 109.6L219.7 109.1L221.3 108.8L223 108.7L224.7 108.8L226.3 109.1L227.8 109.5L229 110.1L229.9 110.8L230.5 111.6L230.7 112.5L230.5 113.3L230 114.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M230.7 112.5L230.5 113.3L230 114.2L229.1 114.9L227.9 115.5L226.5 116L224.9 116.2L223.2 116.4L221.5 116.3L219.8 116L218.4 115.5L217.2 114.9L216.2 114.2L215.6 113.4L215.4 112.6\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M215.4 112.6L215.6 111.7L216.2 110.9L217.1 110.2L218.3 109.6L219.7 109.1L221.3 108.8L223 108.7L224.7 108.8L226.3 109.1L227.8 109.5L229 110.1L229.9 110.8L230.5 111.6L230.7 112.5M230.7 116.7L230.5 117.5L230 118.3L229.1 119L227.9 119.7L226.5 120.1L224.9 120.4L223.2 120.5L221.5 120.4L219.8 120.2L218.4 119.7L217.2 119.1L216.2 118.4L215.6 117.6L215.4 116.7M215.4 112.6L215.4 116.7M230.7 112.5L230.7 116.7\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M126.1 172.5L126.3 171.4L127 170.3L128.2 169.4L129.7 168.6L131.6 168L133.7 167.6L135.9 167.5L138.1 167.6L140.2 168L142.1 168.5L143.7 169.3L144.9 170.2L145.6 171.3L145.9 172.4L145.9 174.4L145.6 175.5L144.9 176.5L143.8 177.5L142.2 178.2L140.4 178.8L138.3 179.2L136.1 179.4L133.9 179.2L131.8 178.9L129.9 178.3L128.3 177.5L127.1 176.6L126.3 175.6L126.1 174.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M143.8 177.5L142.2 178.2L142.2 176.3L143.8 175.5ZM142.2 178.2L140.4 178.8L140.4 176.9L142.2 176.3ZM145.9 174.4L145.6 175.5L145.6 173.5L145.9 172.4ZM145.6 175.5L144.9 176.5L144.9 174.5L145.6 173.5ZM144.9 176.5L143.8 177.5L143.8 175.5L144.9 174.5Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M140.4 178.8L138.3 179.2L138.3 177.3L140.4 176.9ZM138.3 179.2L136.1 179.4L136.1 177.4L138.3 177.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M136.1 179.4L133.9 179.2L133.9 177.3L136.1 177.4ZM133.9 179.2L131.8 178.9L131.8 176.9L133.9 177.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M131.8 178.9L129.9 178.3L129.9 176.3L131.8 176.9ZM129.9 178.3L128.3 177.5L128.3 175.6L129.9 176.3ZM128.3 177.5L127.1 176.6L127.1 174.6L128.3 175.6ZM127.1 176.6L126.3 175.6L126.3 173.6L127.1 174.6ZM126.3 175.6L126.1 174.5L126.1 172.5L126.3 173.6Z\"/><path class=\"iso-top\" d=\"M143.8 175.5L142.2 176.3L140.4 176.9L138.3 177.3L136.1 177.4L133.9 177.3L131.8 176.9L129.9 176.3L128.3 175.6L127.1 174.6L126.3 173.6L126.1 172.5L126.3 171.4L127 170.3L128.2 169.4L129.7 168.6L131.6 168L133.7 167.6L135.9 167.5L138.1 167.6L140.2 168L142.1 168.5L143.7 169.3L144.9 170.2L145.6 171.3L145.9 172.4L145.6 173.5L144.9 174.5Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M145.9 172.4L145.6 173.5L144.9 174.5L143.8 175.5L142.2 176.3L140.4 176.9L138.3 177.3L136.1 177.4L133.9 177.3L131.8 176.9L129.9 176.3L128.3 175.6L127.1 174.6L126.3 173.6L126.1 172.5\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M126.1 172.5L126.3 171.4L127 170.3L128.2 169.4L129.7 168.6L131.6 168L133.7 167.6L135.9 167.5L138.1 167.6L140.2 168L142.1 168.5L143.7 169.3L144.9 170.2L145.6 171.3L145.9 172.4M145.9 174.4L145.6 175.5L144.9 176.5L143.8 177.5L142.2 178.2L140.4 178.8L138.3 179.2L136.1 179.4L133.9 179.2L131.8 178.9L129.9 178.3L128.3 177.5L127.1 176.6L126.3 175.6L126.1 174.5M126.1 172.5L126.1 174.5M145.9 172.4L145.9 174.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M128.3 168.3L128.5 167.5L129.1 166.7L130 165.9L131.1 165.3L132.6 164.9L134.2 164.6L135.9 164.5L137.6 164.5L139.2 164.8L140.7 165.3L141.9 165.9L142.8 166.6L143.4 167.4L143.6 168.2L143.6 172.4L143.4 173.3L142.9 174.1L142 174.8L140.8 175.4L139.4 175.9L137.7 176.2L136 176.3L134.3 176.2L132.7 175.9L131.3 175.5L130 174.9L129.1 174.1L128.5 173.3L128.3 172.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M142 174.8L140.8 175.4L140.8 171.2L142 170.6ZM140.8 175.4L139.4 175.9L139.4 171.7L140.8 171.2ZM143.6 172.4L143.4 173.3L143.4 169.1L143.6 168.2ZM143.4 173.3L142.9 174.1L142.9 169.9L143.4 169.1ZM142.9 174.1L142 174.8L142 170.6L142.9 169.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M139.4 175.9L137.7 176.2L137.7 172L139.4 171.7ZM137.7 176.2L136 176.3L136 172.1L137.7 172Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M136 176.3L134.3 176.2L134.3 172L136 172.1ZM134.3 176.2L132.7 175.9L132.7 171.7L134.3 172Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M132.7 175.9L131.3 175.5L131.3 171.3L132.7 171.7ZM131.3 175.5L130 174.9L130 170.7L131.3 171.3ZM130 174.9L129.1 174.1L129.1 170L130 170.7ZM129.1 174.1L128.5 173.3L128.5 169.2L129.1 170ZM128.5 173.3L128.3 172.5L128.3 168.3L128.5 169.2Z\"/><path class=\"iso-top\" d=\"M142 170.6L140.8 171.2L139.4 171.7L137.7 172L136 172.1L134.3 172L132.7 171.7L131.3 171.3L130 170.7L129.1 170L128.5 169.2L128.3 168.3L128.5 167.5L129.1 166.7L130 165.9L131.1 165.3L132.6 164.9L134.2 164.6L135.9 164.5L137.6 164.5L139.2 164.8L140.7 165.3L141.9 165.9L142.8 166.6L143.4 167.4L143.6 168.2L143.4 169.1L142.9 169.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M143.6 168.2L143.4 169.1L142.9 169.9L142 170.6L140.8 171.2L139.4 171.7L137.7 172L136 172.1L134.3 172L132.7 171.7L131.3 171.3L130 170.7L129.1 170L128.5 169.2L128.3 168.3\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M128.3 168.3L128.5 167.5L129.1 166.7L130 165.9L131.1 165.3L132.6 164.9L134.2 164.6L135.9 164.5L137.6 164.5L139.2 164.8L140.7 165.3L141.9 165.9L142.8 166.6L143.4 167.4L143.6 168.2M143.6 172.4L143.4 173.3L142.9 174.1L142 174.8L140.8 175.4L139.4 175.9L137.7 176.2L136 176.3L134.3 176.2L132.7 175.9L131.3 175.5L130 174.9L129.1 174.1L128.5 173.3L128.3 172.5M128.3 168.3L128.3 172.5M143.6 168.2L143.6 172.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M494.1 226.5L494.4 225.4L495.1 224.3L496.2 223.4L497.8 222.6L499.6 222L501.7 221.6L503.9 221.5L506.1 221.6L508.2 222L510.1 222.5L511.7 223.3L512.9 224.3L513.7 225.3L513.9 226.4L513.9 228.4L513.7 229.5L513 230.5L511.8 231.5L510.3 232.3L508.4 232.9L506.3 233.2L504.1 233.4L501.9 233.2L499.8 232.9L497.9 232.3L496.3 231.5L495.1 230.6L494.4 229.6L494.1 228.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M511.8 231.5L510.3 232.3L510.3 230.3L511.8 229.5ZM510.3 232.3L508.4 232.9L508.4 230.9L510.3 230.3ZM513.9 228.4L513.7 229.5L513.7 227.5L513.9 226.4ZM513.7 229.5L513 230.5L513 228.6L513.7 227.5ZM513 230.5L511.8 231.5L511.8 229.5L513 228.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M508.4 232.9L506.3 233.2L506.3 231.3L508.4 230.9ZM506.3 233.2L504.1 233.4L504.1 231.4L506.3 231.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M504.1 233.4L501.9 233.2L501.9 231.3L504.1 231.4ZM501.9 233.2L499.8 232.9L499.8 230.9L501.9 231.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M499.8 232.9L497.9 232.3L497.9 230.4L499.8 230.9ZM497.9 232.3L496.3 231.5L496.3 229.6L497.9 230.4ZM496.3 231.5L495.1 230.6L495.1 228.6L496.3 229.6ZM495.1 230.6L494.4 229.6L494.4 227.6L495.1 228.6ZM494.4 229.6L494.1 228.5L494.1 226.5L494.4 227.6Z\"/><path class=\"iso-top\" d=\"M511.8 229.5L510.3 230.3L508.4 230.9L506.3 231.3L504.1 231.4L501.9 231.3L499.8 230.9L497.9 230.4L496.3 229.6L495.1 228.6L494.4 227.6L494.1 226.5L494.4 225.4L495.1 224.3L496.2 223.4L497.8 222.6L499.6 222L501.7 221.6L503.9 221.5L506.1 221.6L508.2 222L510.1 222.5L511.7 223.3L512.9 224.3L513.7 225.3L513.9 226.4L513.7 227.5L513 228.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M513.9 226.4L513.7 227.5L513 228.6L511.8 229.5L510.3 230.3L508.4 230.9L506.3 231.3L504.1 231.4L501.9 231.3L499.8 230.9L497.9 230.4L496.3 229.6L495.1 228.6L494.4 227.6L494.1 226.5\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M494.1 226.5L494.4 225.4L495.1 224.3L496.2 223.4L497.8 222.6L499.6 222L501.7 221.6L503.9 221.5L506.1 221.6L508.2 222L510.1 222.5L511.7 223.3L512.9 224.3L513.7 225.3L513.9 226.4M513.9 228.4L513.7 229.5L513 230.5L511.8 231.5L510.3 232.3L508.4 232.9L506.3 233.2L504.1 233.4L501.9 233.2L499.8 232.9L497.9 232.3L496.3 231.5L495.1 230.6L494.4 229.6L494.1 228.5M494.1 226.5L494.1 228.5M513.9 226.4L513.9 228.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M496.4 222.3L496.6 221.5L497.1 220.7L498 219.9L499.2 219.3L500.6 218.9L502.3 218.6L504 218.5L505.7 218.6L507.3 218.8L508.7 219.3L510 219.9L510.9 220.6L511.5 221.4L511.7 222.2L511.7 226.4L511.5 227.3L510.9 228.1L510 228.8L508.9 229.4L507.4 229.9L505.8 230.2L504.1 230.3L502.4 230.2L500.8 229.9L499.3 229.5L498.1 228.9L497.2 228.1L496.6 227.3L496.4 226.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M510 228.8L508.9 229.4L508.9 225.2L510 224.6ZM508.9 229.4L507.4 229.9L507.4 225.7L508.9 225.2ZM511.7 226.4L511.5 227.3L511.5 223.1L511.7 222.2ZM511.5 227.3L510.9 228.1L510.9 223.9L511.5 223.1ZM510.9 228.1L510 228.8L510 224.6L510.9 223.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M507.4 229.9L505.8 230.2L505.8 226L507.4 225.7ZM505.8 230.2L504.1 230.3L504.1 226.1L505.8 226Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M504.1 230.3L502.4 230.2L502.4 226L504.1 226.1ZM502.4 230.2L500.8 229.9L500.8 225.7L502.4 226Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M500.8 229.9L499.3 229.5L499.3 225.3L500.8 225.7ZM499.3 229.5L498.1 228.9L498.1 224.7L499.3 225.3ZM498.1 228.9L497.2 228.1L497.2 224L498.1 224.7ZM497.2 228.1L496.6 227.3L496.6 223.2L497.2 224ZM496.6 227.3L496.4 226.5L496.4 222.3L496.6 223.2Z\"/><path class=\"iso-top\" d=\"M510 224.6L508.9 225.2L507.4 225.7L505.8 226L504.1 226.1L502.4 226L500.8 225.7L499.3 225.3L498.1 224.7L497.2 224L496.6 223.2L496.4 222.3L496.6 221.5L497.1 220.7L498 219.9L499.2 219.3L500.6 218.9L502.3 218.6L504 218.5L505.7 218.6L507.3 218.8L508.7 219.3L510 219.9L510.9 220.6L511.5 221.4L511.7 222.2L511.5 223.1L510.9 223.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M511.7 222.2L511.5 223.1L510.9 223.9L510 224.6L508.9 225.2L507.4 225.7L505.8 226L504.1 226.1L502.4 226L500.8 225.7L499.3 225.3L498.1 224.7L497.2 224L496.6 223.2L496.4 222.3\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M496.4 222.3L496.6 221.5L497.1 220.7L498 219.9L499.2 219.3L500.6 218.9L502.3 218.6L504 218.5L505.7 218.6L507.3 218.8L508.7 219.3L510 219.9L510.9 220.6L511.5 221.4L511.7 222.2M511.7 226.4L511.5 227.3L510.9 228.1L510 228.8L508.9 229.4L507.4 229.9L505.8 230.2L504.1 230.3L502.4 230.2L500.8 229.9L499.3 229.5L498.1 228.9L497.2 228.1L496.6 227.3L496.4 226.5M496.4 222.3L496.4 226.5M511.7 222.2L511.7 226.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M407 282.2L407.2 281.1L408 280.1L409.1 279.1L410.7 278.4L412.5 277.8L414.6 277.4L416.8 277.2L419 277.4L421.1 277.7L423 278.3L424.6 279.1L425.8 280L426.6 281L426.8 282.1L426.8 284.1L426.6 285.2L425.9 286.3L424.7 287.2L423.2 288L421.3 288.6L419.2 289L417 289.1L414.8 289L412.7 288.6L410.8 288.1L409.2 287.3L408 286.3L407.3 285.3L407 284.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M424.7 287.2L423.2 288L423.2 286L424.7 285.2ZM423.2 288L421.3 288.6L421.3 286.6L423.2 286ZM426.8 284.1L426.6 285.2L426.6 283.2L426.8 282.1ZM426.6 285.2L425.9 286.3L425.9 284.3L426.6 283.2ZM425.9 286.3L424.7 287.2L424.7 285.2L425.9 284.3Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M421.3 288.6L419.2 289L419.2 287L421.3 286.6ZM419.2 289L417 289.1L417 287.1L419.2 287Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M417 289.1L414.8 289L414.8 287L417 287.1ZM414.8 289L412.7 288.6L412.7 286.7L414.8 287Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M412.7 288.6L410.8 288.1L410.8 286.1L412.7 286.7ZM410.8 288.1L409.2 287.3L409.2 285.3L410.8 286.1ZM409.2 287.3L408 286.3L408 284.4L409.2 285.3ZM408 286.3L407.3 285.3L407.3 283.3L408 284.4ZM407.3 285.3L407 284.2L407 282.2L407.3 283.3Z\"/><path class=\"iso-top\" d=\"M424.7 285.2L423.2 286L421.3 286.6L419.2 287L417 287.1L414.8 287L412.7 286.7L410.8 286.1L409.2 285.3L408 284.4L407.3 283.3L407 282.2L407.2 281.1L408 280.1L409.1 279.1L410.7 278.4L412.5 277.8L414.6 277.4L416.8 277.2L419 277.4L421.1 277.7L423 278.3L424.6 279.1L425.8 280L426.6 281L426.8 282.1L426.6 283.2L425.9 284.3Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M426.8 282.1L426.6 283.2L425.9 284.3L424.7 285.2L423.2 286L421.3 286.6L419.2 287L417 287.1L414.8 287L412.7 286.7L410.8 286.1L409.2 285.3L408 284.4L407.3 283.3L407 282.2\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M407 282.2L407.2 281.1L408 280.1L409.1 279.1L410.7 278.4L412.5 277.8L414.6 277.4L416.8 277.2L419 277.4L421.1 277.7L423 278.3L424.6 279.1L425.8 280L426.6 281L426.8 282.1M426.8 284.1L426.6 285.2L425.9 286.3L424.7 287.2L423.2 288L421.3 288.6L419.2 289L417 289.1L414.8 289L412.7 288.6L410.8 288.1L409.2 287.3L408 286.3L407.3 285.3L407 284.2M407 282.2L407 284.2M426.8 282.1L426.8 284.1\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M409.3 278.1L409.5 277.2L410 276.4L410.9 275.7L412.1 275.1L413.5 274.6L415.1 274.3L416.8 274.2L418.5 274.3L420.2 274.6L421.6 275L422.8 275.6L423.8 276.3L424.4 277.1L424.6 278L424.6 282.2L424.4 283L423.8 283.8L422.9 284.5L421.7 285.2L420.3 285.6L418.7 285.9L417 286L415.3 285.9L413.7 285.7L412.2 285.2L411 284.6L410.1 283.9L409.5 283.1L409.3 282.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M422.9 284.5L421.7 285.2L421.7 281L422.9 280.4ZM421.7 285.2L420.3 285.6L420.3 281.5L421.7 281ZM424.6 282.2L424.4 283L424.4 278.8L424.6 278ZM424.4 283L423.8 283.8L423.8 279.7L424.4 278.8ZM423.8 283.8L422.9 284.5L422.9 280.4L423.8 279.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M420.3 285.6L418.7 285.9L418.7 281.7L420.3 281.5ZM418.7 285.9L417 286L417 281.8L418.7 281.7Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M417 286L415.3 285.9L415.3 281.8L417 281.8ZM415.3 285.9L413.7 285.7L413.7 281.5L415.3 281.8Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M413.7 285.7L412.2 285.2L412.2 281L413.7 281.5ZM412.2 285.2L411 284.6L411 280.4L412.2 281ZM411 284.6L410.1 283.9L410.1 279.7L411 280.4ZM410.1 283.9L409.5 283.1L409.5 278.9L410.1 279.7ZM409.5 283.1L409.3 282.2L409.3 278.1L409.5 278.9Z\"/><path class=\"iso-top\" d=\"M422.9 280.4L421.7 281L420.3 281.5L418.7 281.7L417 281.8L415.3 281.8L413.7 281.5L412.2 281L411 280.4L410.1 279.7L409.5 278.9L409.3 278.1L409.5 277.2L410 276.4L410.9 275.7L412.1 275.1L413.5 274.6L415.1 274.3L416.8 274.2L418.5 274.3L420.2 274.6L421.6 275L422.8 275.6L423.8 276.3L424.4 277.1L424.6 278L424.4 278.8L423.8 279.7Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M424.6 278L424.4 278.8L423.8 279.7L422.9 280.4L421.7 281L420.3 281.5L418.7 281.7L417 281.8L415.3 281.8L413.7 281.5L412.2 281L411 280.4L410.1 279.7L409.5 278.9L409.3 278.1\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M409.3 278.1L409.5 277.2L410 276.4L410.9 275.7L412.1 275.1L413.5 274.6L415.1 274.3L416.8 274.2L418.5 274.3L420.2 274.6L421.6 275L422.8 275.6L423.8 276.3L424.4 277.1L424.6 278M424.6 282.2L424.4 283L423.8 283.8L422.9 284.5L421.7 285.2L420.3 285.6L418.7 285.9L417 286L415.3 285.9L413.7 285.7L412.2 285.2L411 284.6L410.1 283.9L409.5 283.1L409.3 282.2M409.3 278.1L409.3 282.2M424.6 278L424.6 282.2\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M96.9 154.9L97.3 153.8L98.1 152.7L99.2 151.8L210.7 80.4L212.3 79.6L214.1 79L216.1 78.6L218.3 78.3L220.5 78.3L222.7 78.5L224.8 78.9L226.6 79.5L538.8 201.4L540.4 202.2L541.7 203.1L542.6 204.1L543.1 205.2L543.1 206.3L543.1 221L542.7 222.1L541.9 223.1L540.8 224.1L429.3 295.4L427.7 296.2L425.9 296.9L423.9 297.3L421.7 297.5L419.5 297.6L417.3 297.4L415.2 297L413.4 296.4L101.2 174.4L99.6 173.7L98.3 172.8L97.4 171.8L96.9 170.7L96.9 169.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M543.1 221L542.7 222.1L542.7 207.4L543.1 206.3ZM542.7 222.1L541.9 223.1L541.9 208.4L542.7 207.4ZM541.9 223.1L540.8 224.1L540.8 209.4L541.9 208.4ZM540.8 224.1L429.3 295.4L429.3 280.7L540.8 209.4ZM429.3 295.4L427.7 296.2L427.7 281.5L429.3 280.7ZM427.7 296.2L425.9 296.9L425.9 282.2L427.7 281.5Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M425.9 296.9L423.9 297.3L423.9 282.6L425.9 282.2ZM423.9 297.3L421.7 297.5L421.7 282.8L423.9 282.6ZM421.7 297.5L419.5 297.6L419.5 282.9L421.7 282.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M419.5 297.6L417.3 297.4L417.3 282.7L419.5 282.9ZM417.3 297.4L415.2 297L415.2 282.3L417.3 282.7Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M415.2 297L413.4 296.4L413.4 281.7L415.2 282.3ZM413.4 296.4L101.2 174.4L101.2 159.7L413.4 281.7ZM101.2 174.4L99.6 173.7L99.6 159L101.2 159.7ZM99.6 173.7L98.3 172.8L98.3 158.1L99.6 159ZM98.3 172.8L97.4 171.8L97.4 157.1L98.3 158.1ZM97.4 171.8L96.9 170.7L96.9 156L97.4 157.1ZM96.9 170.7L96.9 169.6L96.9 154.9L96.9 156Z\"/><path class=\"iso-top\" d=\"M538.8 201.4L540.4 202.2L541.7 203.1L542.6 204.1L543.1 205.2L543.1 206.3L542.7 207.4L541.9 208.4L540.8 209.4L429.3 280.7L427.7 281.5L425.9 282.2L423.9 282.6L421.7 282.8L419.5 282.9L417.3 282.7L415.2 282.3L413.4 281.7L101.2 159.7L99.6 159L98.3 158.1L97.4 157.1L96.9 156L96.9 154.9L97.3 153.8L98.1 152.7L99.2 151.8L210.7 80.4L212.3 79.6L214.1 79L216.1 78.6L218.3 78.3L220.5 78.3L222.7 78.5L224.8 78.9L226.6 79.5Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M543.1 206.3L542.7 207.4L541.9 208.4L540.8 209.4L429.3 280.7L427.7 281.5L425.9 282.2L423.9 282.6L421.7 282.8L419.5 282.9L417.3 282.7L415.2 282.3L413.4 281.7L101.2 159.7L99.6 159L98.3 158.1L97.4 157.1L96.9 156L96.9 154.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M543.1 206.3L540.6 207.1L539.9 207.9L538.9 208.7L427.5 280L426.2 280.7L424.8 281.2L423.2 281.5L421.4 281.7L419.7 281.7L417.9 281.6L416.3 281.3L414.7 280.8L102.7 158.9L101.3 158.2L100.3 157.5L99.6 156.7L99.2 155.8L96.9 154.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M96.9 154.9L97.3 153.8L98.1 152.7L99.2 151.8L210.7 80.4L212.3 79.6L214.1 79L216.1 78.6L218.3 78.3L220.5 78.3L222.7 78.5L224.8 78.9L226.6 79.5L538.8 201.4L540.4 202.2L541.7 203.1L542.6 204.1L543.1 205.2L543.1 206.3M543.1 221L542.7 222.1L541.9 223.1L540.8 224.1L429.3 295.4L427.7 296.2L425.9 296.9L423.9 297.3L421.7 297.5L419.5 297.6L417.3 297.4L415.2 297L413.4 296.4L101.2 174.4L99.6 173.7L98.3 172.8L97.4 171.8L96.9 170.7L96.9 169.6M543.1 206.3L543.1 221M96.9 154.9L96.9 169.6\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M534.4 204.2L535 204.5L535.5 204.8L535.9 205.2L536 205.6L536.1 206L535.9 206.4L535.6 206.8L535.2 207.2L423.7 278.5L423.1 278.8L422.4 279.1L421.7 279.2L420.9 279.3L420 279.3L419.2 279.3L418.4 279.1L417.7 278.9L105.6 157L105 156.7L104.5 156.3L104.1 155.9L104 155.5L103.9 155.1L104.1 154.7L104.4 154.3L104.8 154L216.3 82.6L216.9 82.3L217.6 82.1L218.3 81.9L219.1 81.8L220 81.8L220.8 81.9L221.6 82L222.3 82.3Z\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M222.8 87.9L221.9 88.3L220.8 88.5L219.6 88.4L218.5 88.1L217.7 87.7L217.3 87.1L217.4 86.5L217.9 85.9L218.9 85.6L220 85.4L221.2 85.4L222.3 85.7L223.1 86.1L223.5 86.7L223.4 87.3ZM528.3 207.2L527.4 207.6L526.3 207.8L525 207.7L524 207.5L523.2 207L522.8 206.4L522.9 205.8L523.4 205.3L524.3 204.9L525.5 204.7L526.7 204.7L527.8 205L528.6 205.5L529 206.1L528.9 206.7ZM116.6 155.9L115.7 156.3L114.5 156.5L113.3 156.4L112.2 156.1L111.4 155.7L111 155.1L111.1 154.5L111.7 154L112.6 153.6L113.7 153.4L115 153.4L116 153.7L116.8 154.1L117.2 154.7L117.1 155.3ZM422.1 275.2L421.1 275.6L420 275.8L418.8 275.7L417.7 275.5L416.9 275L416.5 274.4L416.6 273.8L417.2 273.3L418.1 272.9L419.2 272.7L420.4 272.7L421.5 273L422.3 273.5L422.7 274.1L422.6 274.7Z\"/><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"220.4\" cy=\"86.9\" r=\"0.5\"/><circle cx=\"525.9\" cy=\"206.2\" r=\"0.5\"/><circle cx=\"114.1\" cy=\"154.9\" r=\"0.5\"/><circle cx=\"419.6\" cy=\"274.2\" r=\"0.5\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M139.7 159.9L140.1 159.4L150.6 152.7L151.4 152.4L152.5 152.3L153.5 152.5L199.2 170.4L199.9 170.8L200 171.4L200 172.1L199.6 172.6L189.2 179.3L188.3 179.6L187.2 179.7L186.2 179.5L140.5 161.6L139.8 161.2L139.7 160.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M200 172.1L199.6 172.6L199.6 171.9L200 171.4ZM199.6 172.6L189.2 179.3L189.2 178.6L199.6 171.9ZM189.2 179.3L188.3 179.6L188.3 178.9L189.2 178.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M188.3 179.6L187.2 179.7L187.2 178.9L188.3 178.9Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M187.2 179.7L186.2 179.5L186.2 178.7L187.2 178.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M186.2 179.5L140.5 161.6L140.5 160.9L186.2 178.7ZM140.5 161.6L139.8 161.2L139.8 160.4L140.5 160.9ZM139.8 161.2L139.7 160.6L139.7 159.9L139.8 160.4Z\"/><path class=\"iso-top\" d=\"M199.2 170.4L199.9 170.8L200 171.4L199.6 171.9L189.2 178.6L188.3 178.9L187.2 178.9L186.2 178.7L140.5 160.9L139.8 160.4L139.7 159.9L140.1 159.4L150.6 152.7L151.4 152.4L152.5 152.3L153.5 152.5Z\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M139.7 159.9L140.1 159.4L150.6 152.7L151.4 152.4L152.5 152.3L153.5 152.5L199.2 170.4L199.9 170.8L200 171.4M200 172.1L199.6 172.6L189.2 179.3L188.3 179.6L187.2 179.7L186.2 179.5L140.5 161.6L139.8 161.2L139.7 160.6M200 171.4L200 172.1M139.7 159.9L139.7 160.6\"/></g><path class=\"iso-line\" data-tone=\"lo\" data-free=\"\" d=\"M153.9 156.3L186.3 168.9M150.9 158.2L175.4 167.8M147.9 160.2L164.6 166.7\"/><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"152.3\" cy=\"153.8\" r=\"0.4\"/><circle cx=\"187.4\" cy=\"177.4\" r=\"0.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M222.1 76.1L222.4 75.8L225 74.1L225.6 73.9L226.3 73.8L227 74L232.6 76.1L233 76.4L233.1 76.8L233.1 87.8L232.8 88.2L230.2 89.8L229.6 90.1L228.9 90.1L228.2 90L222.6 87.8L222.2 87.5L222.1 87.1Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M233.1 87.8L232.8 88.2L232.8 77.1L233.1 76.8ZM232.8 88.2L230.2 89.8L230.2 78.8L232.8 77.1ZM230.2 89.8L229.6 90.1L229.6 79L230.2 78.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M229.6 90.1L228.9 90.1L228.9 79.1L229.6 79Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M228.9 90.1L228.2 90L228.2 78.9L228.9 79.1Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M228.2 90L222.6 87.8L222.6 76.8L228.2 78.9ZM222.6 87.8L222.2 87.5L222.2 76.5L222.6 76.8ZM222.2 87.5L222.1 87.1L222.1 76.1L222.2 76.5Z\"/><path class=\"iso-top\" d=\"M232.6 76.1L233 76.4L233.1 76.8L232.8 77.1L230.2 78.8L229.6 79L228.9 79.1L228.2 78.9L222.6 76.8L222.2 76.5L222.1 76.1L222.4 75.8L225 74.1L225.6 73.9L226.3 73.8L227 74Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M233.1 76.8L232.8 77.1L230.2 78.8L229.6 79L228.9 79.1L228.2 78.9L222.6 76.8L222.2 76.5L222.1 76.1\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M233.1 76.8L232.3 77L229.8 78.6L229.4 78.8L229 78.8L228.5 78.7L223 76.6L222.7 76.4L222.1 76.1\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M222.1 76.1L222.4 75.8L225 74.1L225.6 73.9L226.3 73.8L227 74L232.6 76.1L233 76.4L233.1 76.8M233.1 87.8L232.8 88.2L230.2 89.8L229.6 90.1L228.9 90.1L228.2 90L222.6 87.8L222.2 87.5L222.1 87.1M233.1 76.8L233.1 87.8M222.1 76.1L222.1 87.1\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M111.5 146.9L111.8 146.6L114.4 144.9L115 144.7L115.7 144.6L116.4 144.8L121.9 146.9L122.4 147.2L122.5 147.6L122.5 158.6L122.2 159L119.6 160.6L119 160.8L118.2 160.9L117.6 160.8L112 158.6L111.6 158.3L111.5 157.9Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M122.5 158.6L122.2 159L122.2 147.9L122.5 147.6ZM122.2 159L119.6 160.6L119.6 149.6L122.2 147.9ZM119.6 160.6L119 160.8L119 149.8L119.6 149.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M119 160.8L118.2 160.9L118.2 149.9L119 149.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M118.2 160.9L117.6 160.8L117.6 149.7L118.2 149.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M117.6 160.8L112 158.6L112 147.5L117.6 149.7ZM112 158.6L111.6 158.3L111.6 147.3L112 147.5ZM111.6 158.3L111.5 157.9L111.5 146.9L111.6 147.3Z\"/><path class=\"iso-top\" d=\"M121.9 146.9L122.4 147.2L122.5 147.6L122.2 147.9L119.6 149.6L119 149.8L118.2 149.9L117.6 149.7L112 147.5L111.6 147.3L111.5 146.9L111.8 146.6L114.4 144.9L115 144.7L115.7 144.6L116.4 144.8Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M122.5 147.6L122.2 147.9L119.6 149.6L119 149.8L118.2 149.9L117.6 149.7L112 147.5L111.6 147.3L111.5 146.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M122.5 147.6L121.7 147.8L119.2 149.4L118.8 149.6L118.3 149.6L117.9 149.5L112.4 147.3L112.1 147.1L111.5 146.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M111.5 146.9L111.8 146.6L114.4 144.9L115 144.7L115.7 144.6L116.4 144.8L121.9 146.9L122.4 147.2L122.5 147.6M122.5 158.6L122.2 159L119.6 160.6L119 160.8L118.2 160.9L117.6 160.8L112 158.6L111.6 158.3L111.5 157.9M122.5 147.6L122.5 158.6M111.5 146.9L111.5 157.9\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M107 99.8L107.3 99.5L220.5 27L221.1 26.8L221.8 26.7L222.5 26.9L224.7 27.8L225.2 28L225.3 28.4L225.3 84.8L225 85.1L111.8 157.6L111.2 157.8L110.4 157.8L109.8 157.7L107.5 156.8L107.1 156.5L107 156.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M225.3 84.8L225 85.1L225 28.8L225.3 28.4ZM225 85.1L111.8 157.6L111.8 101.2L225 28.8ZM111.8 157.6L111.2 157.8L111.2 101.4L111.8 101.2Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M111.2 157.8L110.4 157.8L110.4 101.5L111.2 101.4Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M110.4 157.8L109.8 157.7L109.8 101.3L110.4 101.5Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M109.8 157.7L107.5 156.8L107.5 100.5L109.8 101.3ZM107.5 156.8L107.1 156.5L107.1 100.2L107.5 100.5ZM107.1 156.5L107 156.2L107 99.8L107.1 100.2Z\"/><path class=\"iso-top\" d=\"M224.7 27.8L225.2 28L225.3 28.4L225 28.8L111.8 101.2L111.2 101.4L110.4 101.5L109.8 101.3L107.5 100.5L107.1 100.2L107 99.8L107.3 99.5L220.5 27L221.1 26.8L221.8 26.7L222.5 26.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M225.3 28.4L225 28.8L111.8 101.2L111.2 101.4L110.4 101.5L109.8 101.3L107.5 100.5L107.1 100.2L107 99.8\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M225.3 28.4L224.4 28.6L111.3 101L110.9 101.1L110.5 101.1L110.1 101L108 100.2L107.8 100L107 99.8\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M107 99.8L107.3 99.5L220.5 27L221.1 26.8L221.8 26.7L222.5 26.9L224.7 27.8L225.2 28L225.3 28.4M225.3 84.8L225 85.1L111.8 157.6L111.2 157.8L110.4 157.8L109.8 157.7L107.5 156.8L107.1 156.5L107 156.2M225.3 28.4L225.3 84.8M107 99.8L107 156.2\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M105 98L105.3 97.6L220.3 24.1L220.9 23.8L221.6 23.8L222.3 23.9L226.7 25.7L227.2 26L227.3 26.3L227.3 28.3L227 28.6L112 102.2L111.4 102.4L110.7 102.5L110 102.3L105.6 100.6L105.1 100.3L105 99.9Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M227.3 28.3L227 28.6L227 26.7L227.3 26.3ZM227 28.6L112 102.2L112 100.3L227 26.7ZM112 102.2L111.4 102.4L111.4 100.5L112 100.3Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M111.4 102.4L110.7 102.5L110.7 100.5L111.4 100.5Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M110.7 102.5L110 102.3L110 100.4L110.7 100.5Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M110 102.3L105.6 100.6L105.6 98.6L110 100.4ZM105.6 100.6L105.1 100.3L105.1 98.3L105.6 98.6ZM105.1 100.3L105 99.9L105 98L105.1 98.3Z\"/><path class=\"iso-top\" d=\"M226.7 25.7L227.2 26L227.3 26.3L227 26.7L112 100.3L111.4 100.5L110.7 100.5L110 100.4L105.6 98.6L105.1 98.3L105 98L105.3 97.6L220.3 24.1L220.9 23.8L221.6 23.8L222.3 23.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M227.3 26.3L227 26.7L112 100.3L111.4 100.5L110.7 100.5L110 100.4L105.6 98.6L105.1 98.3L105 98\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M227.3 26.3L226.6 26.6L111.7 100.1L111.3 100.3L110.7 100.3L110.2 100.2L105.9 98.5L105.5 98.3L105 98\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M105 98L105.3 97.6L220.3 24.1L220.9 23.8L221.6 23.8L222.3 23.9L226.7 25.7L227.2 26L227.3 26.3M227.3 28.3L227 28.6L112 102.2L111.4 102.4L110.7 102.5L110 102.3L105.6 100.6L105.1 100.3L105 99.9M227.3 26.3L227.3 28.3M105 98L105 99.9\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M217.2 33.8L217.2 35.7M213.7 36L213.7 38M210.2 38.2L210.2 40.2M206.7 40.5L206.7 42.4M199.7 44.9L199.7 46.9M196.2 47.1L196.2 49.1M192.8 49.4L192.8 51.3M189.3 51.6L189.3 53.6M182.3 56.1L182.3 58M178.8 58.3L178.8 60.3M175.3 60.5L175.3 62.5M171.9 62.8L171.9 64.7M164.9 67.2L164.9 69.2M161.4 69.4L161.4 71.4M157.9 71.7L157.9 73.6M154.4 73.9L154.4 75.9M147.5 78.4L147.5 80.3M144 80.6L144 82.6M140.5 82.8L140.5 84.8M137 85.1L137 87M130 89.5L130 91.5M126.6 91.7L126.6 93.7M123.1 94L123.1 95.9M119.6 96.2L119.6 98.2\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M220.6 31.5L220.6 35.5M203.2 42.7L203.2 46.6M185.8 53.8L185.8 57.8M168.4 65L168.4 68.9M151 76.1L151 80.1M133.5 87.3L133.5 91.2M116.1 98.4L116.1 102.4\"/><path class=\"iso-line\" data-tone=\"faint\" d=\"M225.3 51.6L111.4 124.5\"/><g class=\"iso-dots\" data-tone=\"lo\"><circle cx=\"191.1\" cy=\"91.4\" r=\"0.45\"/><circle cx=\"143.6\" cy=\"107.6\" r=\"0.45\"/><circle cx=\"186.8\" cy=\"70.2\" r=\"0.45\"/><circle cx=\"140.8\" cy=\"108.9\" r=\"0.45\"/><circle cx=\"134.2\" cy=\"126.4\" r=\"0.45\"/><circle cx=\"182\" cy=\"75.3\" r=\"0.45\"/><circle cx=\"147\" cy=\"126.5\" r=\"0.45\"/><circle cx=\"148.5\" cy=\"107.3\" r=\"0.45\"/><circle cx=\"209.1\" cy=\"66.5\" r=\"0.45\"/><circle cx=\"122.7\" cy=\"114.1\" r=\"0.45\"/><circle cx=\"152.8\" cy=\"99.7\" r=\"0.45\"/><circle cx=\"123.9\" cy=\"103.6\" r=\"0.45\"/><circle cx=\"132\" cy=\"123.9\" r=\"0.45\"/><circle cx=\"205.9\" cy=\"78.1\" r=\"0.45\"/><circle cx=\"176.1\" cy=\"97.3\" r=\"0.45\"/><circle cx=\"121.1\" cy=\"120.9\" r=\"0.45\"/><circle cx=\"216\" cy=\"72.6\" r=\"0.45\"/><circle cx=\"161.8\" cy=\"97\" r=\"0.45\"/><circle cx=\"176.9\" cy=\"101.3\" r=\"0.45\"/><circle cx=\"124.2\" cy=\"141.1\" r=\"0.45\"/><circle cx=\"150.6\" cy=\"85.8\" r=\"0.45\"/><circle cx=\"166.8\" cy=\"108.9\" r=\"0.45\"/><circle cx=\"178.6\" cy=\"96.2\" r=\"0.45\"/><circle cx=\"183\" cy=\"87.2\" r=\"0.45\"/><circle cx=\"156.1\" cy=\"112.8\" r=\"0.45\"/><circle cx=\"124.5\" cy=\"123.1\" r=\"0.45\"/><circle cx=\"129.2\" cy=\"112.3\" r=\"0.45\"/><circle cx=\"153.9\" cy=\"101.7\" r=\"0.45\"/><circle cx=\"120.9\" cy=\"128.1\" r=\"0.45\"/><circle cx=\"145.9\" cy=\"118.5\" r=\"0.45\"/><circle cx=\"159\" cy=\"105.8\" r=\"0.45\"/><circle cx=\"186.7\" cy=\"86.2\" r=\"0.45\"/><circle cx=\"210.4\" cy=\"52.2\" r=\"0.45\"/><circle cx=\"214\" cy=\"68.1\" r=\"0.45\"/><circle cx=\"205.8\" cy=\"87.8\" r=\"0.45\"/><circle cx=\"114.8\" cy=\"139.8\" r=\"0.45\"/><circle cx=\"173\" cy=\"86.1\" r=\"0.45\"/><circle cx=\"207.5\" cy=\"49.5\" r=\"0.45\"/><circle cx=\"126.8\" cy=\"102.5\" r=\"0.45\"/><circle cx=\"126.8\" cy=\"101.8\" r=\"0.45\"/><circle cx=\"221.2\" cy=\"70.4\" r=\"0.45\"/><circle cx=\"214.2\" cy=\"85.8\" r=\"0.45\"/><circle cx=\"155.8\" cy=\"113.1\" r=\"0.45\"/><circle cx=\"142.3\" cy=\"110.3\" r=\"0.45\"/><circle cx=\"127.1\" cy=\"131.3\" r=\"0.45\"/><circle cx=\"182\" cy=\"67.1\" r=\"0.45\"/><circle cx=\"209.6\" cy=\"67.3\" r=\"0.45\"/><circle cx=\"222.1\" cy=\"40.6\" r=\"0.45\"/><circle cx=\"220.1\" cy=\"42.4\" r=\"0.45\"/><circle cx=\"202.1\" cy=\"50.9\" r=\"0.45\"/><circle cx=\"161.3\" cy=\"89.8\" r=\"0.45\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"222.4\" cy=\"40\" r=\"0.75\"/><circle cx=\"148.4\" cy=\"99.9\" r=\"0.75\"/><circle cx=\"122.8\" cy=\"108.8\" r=\"0.75\"/><circle cx=\"182.2\" cy=\"91.6\" r=\"0.75\"/><circle cx=\"143.6\" cy=\"92.3\" r=\"0.75\"/><circle cx=\"182.9\" cy=\"90.7\" r=\"0.75\"/><circle cx=\"186.5\" cy=\"80.2\" r=\"0.75\"/><circle cx=\"167.8\" cy=\"85.2\" r=\"0.75\"/><circle cx=\"136.5\" cy=\"96.9\" r=\"0.75\"/><circle cx=\"154.1\" cy=\"118\" r=\"0.75\"/><circle cx=\"140.2\" cy=\"121.1\" r=\"0.75\"/><circle cx=\"148.1\" cy=\"117.7\" r=\"0.75\"/><circle cx=\"153.6\" cy=\"84\" r=\"0.75\"/></g><g class=\"iso-dots\" data-tone=\"hi\"><circle cx=\"223.3\" cy=\"36\" r=\"0.4\"/><circle cx=\"113.5\" cy=\"106.2\" r=\"0.4\"/><circle cx=\"223.3\" cy=\"81.3\" r=\"0.4\"/><circle cx=\"113.5\" cy=\"151.6\" r=\"0.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M158.3 138.7L158.6 138.3L163 135.6L163.6 135.3L164.3 135.3L165 135.4L385.7 221.7L386.1 222L386.2 222.3L386.2 223.1L386 223.4L381.6 226.2L381 226.4L380.3 226.4L379.6 226.3L158.9 140.1L158.4 139.8L158.3 139.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M386.2 223.1L386 223.4L386 222.7L386.2 222.3ZM386 223.4L381.6 226.2L381.6 225.4L386 222.7ZM381.6 226.2L381 226.4L381 225.7L381.6 225.4Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M381 226.4L380.3 226.4L380.3 225.7L381 225.7Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M380.3 226.4L379.6 226.3L379.6 225.6L380.3 225.7Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M379.6 226.3L158.9 140.1L158.9 139.3L379.6 225.6ZM158.9 140.1L158.4 139.8L158.4 139L158.9 139.3ZM158.4 139.8L158.3 139.4L158.3 138.7L158.4 139Z\"/><path class=\"iso-top\" d=\"M385.7 221.7L386.1 222L386.2 222.3L386 222.7L381.6 225.4L381 225.7L380.3 225.7L379.6 225.6L158.9 139.3L158.4 139L158.3 138.7L158.6 138.3L163 135.6L163.6 135.3L164.3 135.3L165 135.4Z\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M158.3 138.7L158.6 138.3L163 135.6L163.6 135.3L164.3 135.3L165 135.4L385.7 221.7L386.1 222L386.2 222.3M386.2 223.1L386 223.4L381.6 226.2L381 226.4L380.3 226.4L379.6 226.3L158.9 140.1L158.4 139.8L158.3 139.4M386.2 222.3L386.2 223.1M158.3 138.7L158.3 139.4\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M167.6 137.2L165.9 138.3M174.3 139.8L172.6 140.9M187.7 145L185.9 146.1M194.4 147.6L192.6 148.8M201.1 150.3L199.3 151.4M207.7 152.9L206 154M221.1 158.1L219.4 159.2M227.8 160.7L226.1 161.8M234.5 163.3L232.8 164.4M241.2 165.9L239.4 167M254.6 171.2L252.8 172.3M261.3 173.8L259.5 174.9M267.9 176.4L266.2 177.5M274.6 179L272.9 180.1M288 184.2L286.3 185.3M294.7 186.8L293 188M301.4 189.5L299.7 190.6M308.1 192.1L306.3 193.2M321.5 197.3L319.7 198.4M328.2 199.9L326.4 201M334.8 202.5L333.1 203.6M341.5 205.1L339.8 206.2M354.9 210.4L353.2 211.5M361.6 213L359.9 214.1M368.3 215.6L366.5 216.7M375 218.2L373.2 219.3\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M181 142.4L177.7 144.5M214.4 155.5L211.1 157.6M247.9 168.5L244.6 170.7M281.3 181.6L278 183.7M314.8 194.7L311.5 196.8M348.2 207.7L344.9 209.9M381.7 220.8L378.4 222.9\"/><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"163\" cy=\"137.8\" r=\"0.45\"/><circle cx=\"381.5\" cy=\"223.2\" r=\"0.45\"/></g><text class=\"iso-face-text\" data-tone=\"lo\" transform=\"matrix(1.115 0.436 -0.871 0.557 376.789 223.93)\" font-size=\"2.6\" text-anchor=\"middle\">1 pc</text><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M182.2 118.1L182.5 117.8L184.3 116.7L184.8 116.5L185.6 116.4L186.2 116.6L407 202.8L407.4 203.1L407.5 203.5L407.5 207.1L407.2 207.5L405.5 208.6L404.9 208.8L404.2 208.9L403.5 208.7L182.8 122.5L182.3 122.2L182.2 121.8Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M407.5 207.1L407.2 207.5L407.2 203.8L407.5 203.5ZM407.2 207.5L405.5 208.6L405.5 204.9L407.2 203.8ZM405.5 208.6L404.9 208.8L404.9 205.1L405.5 204.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M404.9 208.8L404.2 208.9L404.2 205.2L404.9 205.1Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M404.2 208.9L403.5 208.7L403.5 205L404.2 205.2Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M403.5 208.7L182.8 122.5L182.8 118.8L403.5 205ZM182.8 122.5L182.3 122.2L182.3 118.5L182.8 118.8ZM182.3 122.2L182.2 121.8L182.2 118.1L182.3 118.5Z\"/><path class=\"iso-top\" d=\"M407 202.8L407.4 203.1L407.5 203.5L407.2 203.8L405.5 204.9L404.9 205.1L404.2 205.2L403.5 205L182.8 118.8L182.3 118.5L182.2 118.1L182.5 117.8L184.3 116.7L184.8 116.5L185.6 116.4L186.2 116.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M407.5 203.5L407.2 203.8L405.5 204.9L404.9 205.1L404.2 205.2L403.5 205L182.8 118.8L182.3 118.5L182.2 118.1\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M407.5 203.5L406.8 203.7L405.1 204.7L404.7 204.9L404.3 204.9L403.8 204.8L183.2 118.6L182.8 118.4L182.2 118.1\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M182.2 118.1L182.5 117.8L184.3 116.7L184.8 116.5L185.6 116.4L186.2 116.6L407 202.8L407.4 203.1L407.5 203.5M407.5 207.1L407.2 207.5L405.5 208.6L404.9 208.8L404.2 208.9L403.5 208.7L182.8 122.5L182.3 122.2L182.2 121.8M407.5 203.5L407.5 207.1M182.2 118.1L182.2 121.8\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"190.1\" cy=\"119.9\" r=\"0.4\"/><circle cx=\"292.7\" cy=\"159.9\" r=\"0.4\"/><circle cx=\"399.7\" cy=\"201.7\" r=\"0.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M170 126L170.3 125.6L172.1 124.5L172.7 124.3L173.4 124.2L174.1 124.4L394.8 210.6L395.2 210.9L395.3 211.3L395.3 214.9L395 215.3L393.3 216.4L392.7 216.6L392 216.7L391.3 216.5L170.6 130.3L170.1 130L170 129.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M395.3 214.9L395 215.3L395 211.6L395.3 211.3ZM395 215.3L393.3 216.4L393.3 212.7L395 211.6ZM393.3 216.4L392.7 216.6L392.7 212.9L393.3 212.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M392.7 216.6L392 216.7L392 213L392.7 212.9Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M392 216.7L391.3 216.5L391.3 212.8L392 213Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M391.3 216.5L170.6 130.3L170.6 126.6L391.3 212.8ZM170.6 130.3L170.1 130L170.1 126.3L170.6 126.6ZM170.1 130L170 129.6L170 126L170.1 126.3Z\"/><path class=\"iso-top\" d=\"M394.8 210.6L395.2 210.9L395.3 211.3L395 211.6L393.3 212.7L392.7 212.9L392 213L391.3 212.8L170.6 126.6L170.1 126.3L170 126L170.3 125.6L172.1 124.5L172.7 124.3L173.4 124.2L174.1 124.4Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M395.3 211.3L395 211.6L393.3 212.7L392.7 212.9L392 213L391.3 212.8L170.6 126.6L170.1 126.3L170 126\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M395.3 211.3L394.6 211.5L392.9 212.5L392.5 212.7L392.1 212.7L391.6 212.6L171 126.4L170.7 126.2L170 126\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M170 126L170.3 125.6L172.1 124.5L172.7 124.3L173.4 124.2L174.1 124.4L394.8 210.6L395.2 210.9L395.3 211.3M395.3 214.9L395 215.3L393.3 216.4L392.7 216.6L392 216.7L391.3 216.5L170.6 130.3L170.1 130L170 129.6M395.3 211.3L395.3 214.9M170 126L170 129.6\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"177.9\" cy=\"127.7\" r=\"0.4\"/><circle cx=\"280.5\" cy=\"167.7\" r=\"0.4\"/><circle cx=\"387.5\" cy=\"209.5\" r=\"0.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M161.1 121.7L161.4 121.3L182 108.1L182.7 107.8L183.6 107.8L184.4 108L186.2 108.7L186.7 109L186.8 109.4L186.8 117.4L186.5 117.8L165.9 131L165.2 131.2L164.3 131.3L163.5 131.1L161.7 130.4L161.2 130.1L161.1 129.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M186.8 117.4L186.5 117.8L186.5 109.9L186.8 109.4ZM186.5 117.8L165.9 131L165.9 123L186.5 109.9ZM165.9 131L165.2 131.2L165.2 123.3L165.9 123Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M165.2 131.2L164.3 131.3L164.3 123.3L165.2 123.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M164.3 131.3L163.5 131.1L163.5 123.2L164.3 123.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M163.5 131.1L161.7 130.4L161.7 122.5L163.5 123.2ZM161.7 130.4L161.2 130.1L161.2 122.1L161.7 122.5ZM161.2 130.1L161.1 129.6L161.1 121.7L161.2 122.1Z\"/><path class=\"iso-top\" d=\"M186.2 108.7L186.7 109L186.8 109.4L186.5 109.9L165.9 123L165.2 123.3L164.3 123.3L163.5 123.2L161.7 122.5L161.2 122.1L161.1 121.7L161.4 121.3L182 108.1L182.7 107.8L183.6 107.8L184.4 108Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M186.8 109.4L186.5 109.9L165.9 123L165.2 123.3L164.3 123.3L163.5 123.2L161.7 122.5L161.2 122.1L161.1 121.7\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M186.8 109.4L185.8 109.7L165.4 122.8L164.9 122.9L164.4 123L163.9 122.8L162.2 122.2L161.9 122L161.1 121.7\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M161.1 121.7L161.4 121.3L182 108.1L182.7 107.8L183.6 107.8L184.4 108L186.2 108.7L186.7 109L186.8 109.4M186.8 117.4L186.5 117.8L165.9 131L165.2 131.2L164.3 131.3L163.5 131.1L161.7 130.4L161.2 130.1L161.1 129.6M186.8 109.4L186.8 117.4M161.1 121.7L161.1 129.6\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"181.8\" cy=\"110.5\" r=\"0.45\"/><circle cx=\"166.1\" cy=\"120.6\" r=\"0.45\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M389.7 211L390 210.5L410.6 197.4L411.3 197.1L412.1 197.1L412.9 197.2L414.7 197.9L415.2 198.3L415.4 198.7L415.4 206.7L415 207.1L394.5 220.3L393.8 220.5L392.9 220.6L392.1 220.4L390.3 219.7L389.8 219.4L389.7 218.9Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M415.4 206.7L415 207.1L415 199.1L415.4 198.7ZM415 207.1L394.5 220.3L394.5 212.3L415 199.1ZM394.5 220.3L393.8 220.5L393.8 212.6L394.5 212.3Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M393.8 220.5L392.9 220.6L392.9 212.6L393.8 212.6Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M392.9 220.6L392.1 220.4L392.1 212.4L392.9 212.6Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M392.1 220.4L390.3 219.7L390.3 211.7L392.1 212.4ZM390.3 219.7L389.8 219.4L389.8 211.4L390.3 211.7ZM389.8 219.4L389.7 218.9L389.7 211L389.8 211.4Z\"/><path class=\"iso-top\" d=\"M414.7 197.9L415.2 198.3L415.4 198.7L415 199.1L394.5 212.3L393.8 212.6L392.9 212.6L392.1 212.4L390.3 211.7L389.8 211.4L389.7 211L390 210.5L410.6 197.4L411.3 197.1L412.1 197.1L412.9 197.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M415.4 198.7L415 199.1L394.5 212.3L393.8 212.6L392.9 212.6L392.1 212.4L390.3 211.7L389.8 211.4L389.7 211\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M415.4 198.7L414.4 199L394 212L393.5 212.2L393 212.3L392.4 212.1L390.8 211.5L390.4 211.3L389.7 211\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M389.7 211L390 210.5L410.6 197.4L411.3 197.1L412.1 197.1L412.9 197.2L414.7 197.9L415.2 198.3L415.4 198.7M415.4 206.7L415 207.1L394.5 220.3L393.8 220.5L392.9 220.6L392.1 220.4L390.3 219.7L389.8 219.4L389.7 218.9M415.4 198.7L415.4 206.7M389.7 211L389.7 218.9\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"410.3\" cy=\"199.8\" r=\"0.45\"/><circle cx=\"394.7\" cy=\"209.9\" r=\"0.45\"/></g><g data-part=\"carriage\" transform=\"translate(-42.81 -16.72)\"><path class=\"iso-halo\" d=\"M312.4 182.8L329.8 171.6L349.9 179.5L349.9 179.6L332.5 190.8L312.4 182.9Z\" style=\"filter:blur(4px)\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M322.2 170.8L322.5 170.3L325.3 168.5L326.2 168.3L327.2 168.4L331.7 170.2L332.2 170.6L332.2 174.3L332 174.8L329.2 176.6L328.2 176.9L327.2 176.7L322.7 175L322.2 174.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M332.2 174.3L332 174.8L332 171.2L332.2 170.6ZM332 174.8L329.2 176.6L329.2 172.9L332 171.2Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M329.2 176.6L328.2 176.9L328.2 173.2L329.2 172.9Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M328.2 176.9L327.2 176.7L327.2 173.1L328.2 173.2Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M327.2 176.7L322.7 175L322.7 171.3L327.2 173.1ZM322.7 175L322.2 174.5L322.2 170.8L322.7 171.3Z\"/><path class=\"iso-top\" d=\"M331.7 170.2L332.2 170.6L332 171.2L329.2 172.9L328.2 173.2L327.2 173.1L322.7 171.3L322.2 170.8L322.5 170.3L325.3 168.5L326.2 168.3L327.2 168.4Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M332.2 170.6L332 171.2L329.2 172.9L328.2 173.2L327.2 173.1L322.7 171.3L322.2 170.8\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M332.2 170.6L331.6 171.1L328.9 172.8L328.2 173L327.4 172.9L323 171.2L322.2 170.8\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M322.2 170.8L322.5 170.3L325.3 168.5L326.2 168.3L327.2 168.4L331.7 170.2L332.2 170.6M332.2 174.3L332 174.8L329.2 176.6L328.2 176.9L327.2 176.7L322.7 175L322.2 174.5M332.2 170.6L332.2 174.3M322.2 170.8L322.2 174.5\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M310 178.7L310.3 178.1L313.1 176.3L314 176.1L315.1 176.2L319.5 178L320 178.4L320 182.1L319.8 182.6L317 184.4L316 184.7L315 184.5L310.5 182.8L310 182.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M320 182.1L319.8 182.6L319.8 179L320 178.4ZM319.8 182.6L317 184.4L317 180.7L319.8 179Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M317 184.4L316 184.7L316 181L317 180.7Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M316 184.7L315 184.5L315 180.9L316 181Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M315 184.5L310.5 182.8L310.5 179.1L315 180.9ZM310.5 182.8L310 182.3L310 178.7L310.5 179.1Z\"/><path class=\"iso-top\" d=\"M319.5 178L320 178.4L319.8 179L317 180.7L316 181L315 180.9L310.5 179.1L310 178.7L310.3 178.1L313.1 176.3L314 176.1L315.1 176.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M320 178.4L319.8 179L317 180.7L316 181L315 180.9L310.5 179.1L310 178.7\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M320 178.4L319.4 178.9L316.7 180.6L316 180.8L315.2 180.7L310.8 179L310 178.7\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M310 178.7L310.3 178.1L313.1 176.3L314 176.1L315.1 176.2L319.5 178L320 178.4M320 182.1L319.8 182.6L317 184.4L316 184.7L315 184.5L310.5 182.8L310 182.3M320 178.4L320 182.1M310 178.7L310 182.3\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M342.3 178.7L342.5 178.2L345.3 176.4L346.3 176.1L347.3 176.3L351.8 178L352.3 178.5L352.3 182.1L352 182.7L349.2 184.5L348.3 184.7L347.2 184.6L342.8 182.8L342.3 182.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M352.3 182.1L352 182.7L352 179L352.3 178.5ZM352 182.7L349.2 184.5L349.2 180.8L352 179Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M349.2 184.5L348.3 184.7L348.3 181L349.2 180.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M348.3 184.7L347.2 184.6L347.2 180.9L348.3 181Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M347.2 184.6L342.8 182.8L342.8 179.2L347.2 180.9ZM342.8 182.8L342.3 182.4L342.3 178.7L342.8 179.2Z\"/><path class=\"iso-top\" d=\"M351.8 178L352.3 178.5L352 179L349.2 180.8L348.3 181L347.2 180.9L342.8 179.2L342.3 178.7L342.5 178.2L345.3 176.4L346.3 176.1L347.3 176.3Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M352.3 178.5L352 179L349.2 180.8L348.3 181L347.2 180.9L342.8 179.2L342.3 178.7\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M352.3 178.5L351.6 178.9L349 180.6L348.2 180.8L347.4 180.7L343.1 179L342.3 178.7\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M342.3 178.7L342.5 178.2L345.3 176.4L346.3 176.1L347.3 176.3L351.8 178L352.3 178.5M352.3 182.1L352 182.7L349.2 184.5L348.3 184.7L347.2 184.6L342.8 182.8L342.3 182.4M352.3 178.5L352.3 182.1M342.3 178.7L342.3 182.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M330.1 186.5L330.3 186L333.1 184.2L334.1 183.9L335.1 184.1L339.6 185.8L340.1 186.3L340.1 190L339.8 190.5L337 192.3L336.1 192.5L335.1 192.4L330.6 190.6L330.1 190.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M340.1 190L339.8 190.5L339.8 186.8L340.1 186.3ZM339.8 190.5L337 192.3L337 188.6L339.8 186.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M337 192.3L336.1 192.5L336.1 188.8L337 188.6Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M336.1 192.5L335.1 192.4L335.1 188.7L336.1 188.8Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M335.1 192.4L330.6 190.6L330.6 187L335.1 188.7ZM330.6 190.6L330.1 190.2L330.1 186.5L330.6 187Z\"/><path class=\"iso-top\" d=\"M339.6 185.8L340.1 186.3L339.8 186.8L337 188.6L336.1 188.8L335.1 188.7L330.6 187L330.1 186.5L330.3 186L333.1 184.2L334.1 183.9L335.1 184.1Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M340.1 186.3L339.8 186.8L337 188.6L336.1 188.8L335.1 188.7L330.6 187L330.1 186.5\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M340.1 186.3L339.4 186.7L336.8 188.4L336 188.6L335.2 188.5L330.9 186.8L330.1 186.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M330.1 186.5L330.3 186L333.1 184.2L334.1 183.9L335.1 184.1L339.6 185.8L340.1 186.3M340.1 190L339.8 190.5L337 192.3L336.1 192.5L335.1 192.4L330.6 190.6L330.1 190.2M340.1 186.3L340.1 190M330.1 186.5L330.1 190.2\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M307.9 177.5L308.1 177L308.6 176.5L326.9 164.8L327.7 164.4L328.7 164.2L329.8 164.1L330.9 164.2L331.9 164.5L353.1 172.8L353.8 173.2L354.3 173.7L354.4 174.2L354.4 178.4L354.2 178.9L353.7 179.4L335.4 191.1L334.6 191.5L333.6 191.7L332.5 191.8L331.4 191.7L330.4 191.4L309.2 183.1L308.5 182.7L308 182.2L307.9 181.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M354.4 178.4L354.2 178.9L354.2 174.8L354.4 174.2ZM354.2 178.9L353.7 179.4L353.7 175.2L354.2 174.8ZM353.7 179.4L335.4 191.1L335.4 186.9L353.7 175.2ZM335.4 191.1L334.6 191.5L334.6 187.3L335.4 186.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M334.6 191.5L333.6 191.7L333.6 187.6L334.6 187.3ZM333.6 191.7L332.5 191.8L332.5 187.6L333.6 187.6Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M332.5 191.8L331.4 191.7L331.4 187.5L332.5 187.6ZM331.4 191.7L330.4 191.4L330.4 187.2L331.4 187.5Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M330.4 191.4L309.2 183.1L309.2 179L330.4 187.2ZM309.2 183.1L308.5 182.7L308.5 178.6L309.2 179ZM308.5 182.7L308 182.2L308 178.1L308.5 178.6ZM308 182.2L307.9 181.7L307.9 177.5L308 178.1Z\"/><path class=\"iso-top\" d=\"M353.1 172.8L353.8 173.2L354.3 173.7L354.4 174.2L354.2 174.8L353.7 175.2L335.4 186.9L334.6 187.3L333.6 187.6L332.5 187.6L331.4 187.5L330.4 187.2L309.2 179L308.5 178.6L308 178.1L307.9 177.5L308.1 177L308.6 176.5L326.9 164.8L327.7 164.4L328.7 164.2L329.8 164.1L330.9 164.2L331.9 164.5Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M354.4 174.2L354.2 174.8L353.7 175.2L335.4 186.9L334.6 187.3L333.6 187.6L332.5 187.6L331.4 187.5L330.4 187.2L309.2 179L308.5 178.6L308 178.1L307.9 177.5\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M354.4 174.2L353.4 174.6L353 175L334.8 186.7L334.1 187L333.3 187.1L332.5 187.2L331.7 187.1L330.9 186.9L309.8 178.7L309.2 178.3L308.8 178L307.9 177.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M307.9 177.5L308.1 177L308.6 176.5L326.9 164.8L327.7 164.4L328.7 164.2L329.8 164.1L330.9 164.2L331.9 164.5L353.1 172.8L353.8 173.2L354.3 173.7L354.4 174.2M354.4 178.4L354.2 178.9L353.7 179.4L335.4 191.1L334.6 191.5L333.6 191.7L332.5 191.8L331.4 191.7L330.4 191.4L309.2 183.1L308.5 182.7L308 182.2L307.9 181.7M354.4 174.2L354.4 178.4M307.9 177.5L307.9 181.7\"/></g><path class=\"iso-line\" data-tone=\"faint\" d=\"M350.7 174.2L332.6 185.8L311.6 177.6L329.7 166Z\"/><g class=\"iso-dots\" data-tone=\"lo\"><circle cx=\"329.9\" cy=\"166.8\" r=\"0.4\"/><circle cx=\"349.1\" cy=\"174.3\" r=\"0.4\"/><circle cx=\"313.2\" cy=\"177.5\" r=\"0.4\"/><circle cx=\"332.4\" cy=\"185\" r=\"0.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M313.3 188.1L313.4 187.8L318 184.9L318.5 184.7L319.2 184.8L320.5 185.3L320.8 185.6L320.8 187.1L320.6 187.4L316.1 190.3L315.5 190.5L314.9 190.4L313.6 189.8L313.3 189.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M320.8 187.1L320.6 187.4L320.6 185.9L320.8 185.6ZM320.6 187.4L316.1 190.3L316.1 188.8L320.6 185.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M316.1 190.3L315.5 190.5L315.5 189L316.1 188.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M315.5 190.5L314.9 190.4L314.9 188.9L315.5 189Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M314.9 190.4L313.6 189.8L313.6 188.4L314.9 188.9ZM313.6 189.8L313.3 189.6L313.3 188.1L313.6 188.4Z\"/><path class=\"iso-top\" d=\"M320.5 185.3L320.8 185.6L320.6 185.9L316.1 188.8L315.5 189L314.9 188.9L313.6 188.4L313.3 188.1L313.4 187.8L318 184.9L318.5 184.7L319.2 184.8Z\"/><path class=\"iso-line iso-edge\" data-tone=\"hi\" d=\"M313.3 188.1L313.4 187.8L318 184.9L318.5 184.7L319.2 184.8L320.5 185.3L320.8 185.6M320.8 187.1L320.6 187.4L316.1 190.3L315.5 190.5L314.9 190.4L313.6 189.8L313.3 189.6M320.8 185.6L320.8 187.1M313.3 188.1L313.3 189.6\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M341.7 169L341.9 168.3L342.6 167.8L343.5 167.3L344.8 167L346.1 166.9L347.4 167.1L348.5 167.4L349.4 167.9L350 168.5L350.2 169.1L350.2 174.5L349.9 175.2L349.3 175.8L348.3 176.2L347.1 176.5L345.8 176.6L344.5 176.4L343.3 176.1L342.4 175.6L341.8 175L341.7 174.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M349.3 175.8L348.3 176.2L348.3 170.8L349.3 170.4ZM350.2 174.5L349.9 175.2L349.9 169.8L350.2 169.1ZM349.9 175.2L349.3 175.8L349.3 170.4L349.9 169.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M348.3 176.2L347.1 176.5L347.1 171.1L348.3 170.8ZM347.1 176.5L345.8 176.6L345.8 171.2L347.1 171.1Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M345.8 176.6L344.5 176.4L344.5 171.1L345.8 171.2ZM344.5 176.4L343.3 176.1L343.3 170.7L344.5 171.1Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M343.3 176.1L342.4 175.6L342.4 170.3L343.3 170.7ZM342.4 175.6L341.8 175L341.8 169.6L342.4 170.3ZM341.8 175L341.7 174.4L341.7 169L341.8 169.6Z\"/><path class=\"iso-top\" d=\"M349.3 170.4L348.3 170.8L347.1 171.1L345.8 171.2L344.5 171.1L343.3 170.7L342.4 170.3L341.8 169.6L341.7 169L341.9 168.3L342.6 167.8L343.5 167.3L344.8 167L346.1 166.9L347.4 167.1L348.5 167.4L349.4 167.9L350 168.5L350.2 169.1L349.9 169.8Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M350.2 169.1L349.9 169.8L349.3 170.4L348.3 170.8L347.1 171.1L345.8 171.2L344.5 171.1L343.3 170.7L342.4 170.3L341.8 169.6L341.7 169\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M341.7 169L341.9 168.3L342.6 167.8L343.5 167.3L344.8 167L346.1 166.9L347.4 167.1L348.5 167.4L349.4 167.9L350 168.5L350.2 169.1M350.2 174.5L349.9 175.2L349.3 175.8L348.3 176.2L347.1 176.5L345.8 176.6L344.5 176.4L343.3 176.1L342.4 175.6L341.8 175L341.7 174.4M341.7 169L341.7 174.4M350.2 169.1L350.2 174.5\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M349.3 175.3L349.3 170.9M348.2 175.8L348.2 171.4M346.8 176L346.8 171.6M345.3 176.1L345.3 171.7M343.9 175.8L343.9 171.4M342.8 175.4L342.8 171M342 174.8L342 170.3M350 174.6L350 170.2\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M325.5 174L325.5 173.3L325.9 172.6L326.7 171.9L327.7 171.4L329 171L330.5 170.9L331.9 170.9L333.4 171.1L334.6 171.4L335.7 172L336.4 172.6L336.8 173.3L336.8 175.5L336.8 176.3L336.4 177L335.6 177.6L334.6 178.1L333.3 178.5L331.8 178.7L330.4 178.7L328.9 178.5L327.7 178.1L326.6 177.6L325.9 176.9L325.5 176.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M335.6 177.6L334.6 178.1L334.6 175.9L335.6 175.4ZM336.8 175.5L336.8 176.3L336.8 174.1L336.8 173.3ZM336.8 176.3L336.4 177L336.4 174.8L336.8 174.1ZM336.4 177L335.6 177.6L335.6 175.4L336.4 174.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M334.6 178.1L333.3 178.5L333.3 176.3L334.6 175.9ZM333.3 178.5L331.8 178.7L331.8 176.5L333.3 176.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M331.8 178.7L330.4 178.7L330.4 176.5L331.8 176.5ZM330.4 178.7L328.9 178.5L328.9 176.3L330.4 176.5Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M328.9 178.5L327.7 178.1L327.7 175.9L328.9 176.3ZM327.7 178.1L326.6 177.6L326.6 175.4L327.7 175.9ZM326.6 177.6L325.9 176.9L325.9 174.7L326.6 175.4ZM325.9 176.9L325.5 176.2L325.5 174L325.9 174.7Z\"/><path class=\"iso-top\" d=\"M335.6 175.4L334.6 175.9L333.3 176.3L331.8 176.5L330.4 176.5L328.9 176.3L327.7 175.9L326.6 175.4L325.9 174.7L325.5 174L325.5 173.3L325.9 172.6L326.7 171.9L327.7 171.4L329 171L330.5 170.9L331.9 170.9L333.4 171.1L334.6 171.4L335.7 172L336.4 172.6L336.8 173.3L336.8 174.1L336.4 174.8Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M336.8 173.3L336.8 174.1L336.4 174.8L335.6 175.4L334.6 175.9L333.3 176.3L331.8 176.5L330.4 176.5L328.9 176.3L327.7 175.9L326.6 175.4L325.9 174.7L325.5 174\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M325.5 174L325.5 173.3L325.9 172.6L326.7 171.9L327.7 171.4L329 171L330.5 170.9L331.9 170.9L333.4 171.1L334.6 171.4L335.7 172L336.4 172.6L336.8 173.3M336.8 175.5L336.8 176.3L336.4 177L335.6 177.6L334.6 178.1L333.3 178.5L331.8 178.7L330.4 178.7L328.9 178.5L327.7 178.1L326.6 177.6L325.9 176.9L325.5 176.2M325.5 174L325.5 176.2M336.8 173.3L336.8 175.5\"/></g><g class=\"iso-solid\" data-lit=\"\"><path class=\"iso-fill\" d=\"M329.3 155.1L329.4 154.8L329.7 154.5L330.2 154.2L330.9 154.1L331.6 154.1L332.3 154.3L332.7 154.6L333 154.9L333 173.5L332.9 173.9L332.6 174.2L332.1 174.5L331.4 174.6L330.7 174.5L330 174.4L329.5 174.1L329.3 173.8Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M332.6 174.2L332.1 174.5L332.1 155.8L332.6 155.6ZM333 173.5L332.9 173.9L332.9 155.3L333 154.9ZM332.9 173.9L332.6 174.2L332.6 155.6L332.9 155.3Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M332.1 174.5L331.4 174.6L331.4 155.9L332.1 155.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M331.4 174.6L330.7 174.5L330.7 155.9L331.4 155.9ZM330.7 174.5L330 174.4L330 155.8L330.7 155.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M330 174.4L329.5 174.1L329.5 155.5L330 155.8ZM329.5 174.1L329.3 173.8L329.3 155.1L329.5 155.5Z\"/><path class=\"iso-top\" d=\"M332.6 155.6L332.1 155.8L331.4 155.9L330.7 155.9L330 155.8L329.5 155.5L329.3 155.1L329.4 154.8L329.7 154.5L330.2 154.2L330.9 154.1L331.6 154.1L332.3 154.3L332.7 154.6L333 154.9L332.9 155.3Z\"/><path class=\"iso-line iso-edge\" data-tone=\"hi\" d=\"M329.3 155.1L329.4 154.8L329.7 154.5L330.2 154.2L330.9 154.1L331.6 154.1L332.3 154.3L332.7 154.6L333 154.9M333 173.5L332.9 173.9L332.6 174.2L332.1 174.5L331.4 174.6L330.7 174.5L330 174.4L329.5 174.1L329.3 173.8M329.3 155.1L329.3 173.8M333 154.9L333 173.5\"/></g><g class=\"iso-solid\" data-lit=\"\"><path class=\"iso-fill\" d=\"M326.7 151.9L326.7 151.3L327 150.7L327.6 150.2L328.4 149.8L329.5 149.5L330.6 149.4L331.8 149.4L332.9 149.5L333.9 149.8L334.8 150.2L335.3 150.8L335.6 151.3L335.6 154.8L335.6 155.4L335.3 155.9L334.7 156.4L333.9 156.8L332.8 157.1L331.7 157.3L330.5 157.3L329.4 157.1L328.4 156.8L327.5 156.4L327 155.9L326.7 155.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M334.7 156.4L333.9 156.8L333.9 153.4L334.7 153ZM335.6 154.8L335.6 155.4L335.6 151.9L335.6 151.3ZM335.6 155.4L335.3 155.9L335.3 152.5L335.6 151.9ZM335.3 155.9L334.7 156.4L334.7 153L335.3 152.5Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M333.9 156.8L332.8 157.1L332.8 153.7L333.9 153.4ZM332.8 157.1L331.7 157.3L331.7 153.9L332.8 153.7Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M331.7 157.3L330.5 157.3L330.5 153.8L331.7 153.9ZM330.5 157.3L329.4 157.1L329.4 153.7L330.5 153.8Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M329.4 157.1L328.4 156.8L328.4 153.4L329.4 153.7ZM328.4 156.8L327.5 156.4L327.5 153L328.4 153.4ZM327.5 156.4L327 155.9L327 152.5L327.5 153ZM327 155.9L326.7 155.3L326.7 151.9L327 152.5Z\"/><path class=\"iso-top\" d=\"M334.7 153L333.9 153.4L332.8 153.7L331.7 153.9L330.5 153.8L329.4 153.7L328.4 153.4L327.5 153L327 152.5L326.7 151.9L326.7 151.3L327 150.7L327.6 150.2L328.4 149.8L329.5 149.5L330.6 149.4L331.8 149.4L332.9 149.5L333.9 149.8L334.8 150.2L335.3 150.8L335.6 151.3L335.6 151.9L335.3 152.5Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M335.6 151.3L335.6 151.9L335.3 152.5L334.7 153L333.9 153.4L332.8 153.7L331.7 153.9L330.5 153.8L329.4 153.7L328.4 153.4L327.5 153L327 152.5L326.7 151.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M335.6 151.3L335.1 151.9L334.8 152.4L334.3 152.8L333.5 153.2L332.6 153.4L331.6 153.6L330.6 153.6L329.6 153.4L328.7 153.2L328 152.8L327.5 152.3L326.7 151.9\"/><path class=\"iso-line iso-edge\" data-tone=\"hi\" d=\"M326.7 151.9L326.7 151.3L327 150.7L327.6 150.2L328.4 149.8L329.5 149.5L330.6 149.4L331.8 149.4L332.9 149.5L333.9 149.8L334.8 150.2L335.3 150.8L335.6 151.3M335.6 154.8L335.6 155.4L335.3 155.9L334.7 156.4L333.9 156.8L332.8 157.1L331.7 157.3L330.5 157.3L329.4 157.1L328.4 156.8L327.5 156.4L327 155.9L326.7 155.3M326.7 151.9L326.7 155.3M335.6 151.3L335.6 154.8\"/></g><g class=\"iso-dots\" data-tone=\"hi\"><circle cx=\"331.1\" cy=\"151.6\" r=\"0.7\"/></g></g><g data-part=\"sight\"><path class=\"iso-line\" data-tone=\"mid\" data-dashed=\"\" d=\"M288.3 134.9L154.2 97.1\"/><path class=\"iso-line\" data-tone=\"lit\" d=\"M485.8 190.5L288.3 134.9\"/><path class=\"iso-line\" data-tone=\"mid\" data-dashed=\"\" d=\"M288.3 134.9L182.6 78.9\"/><path class=\"iso-line\" data-tone=\"lit\" d=\"M444 217.2L288.3 134.9\"/><g class=\"iso-dots\" data-tone=\"hi\"><circle cx=\"154.2\" cy=\"97.1\" r=\"1.5\"/><circle cx=\"182.6\" cy=\"78.9\" r=\"1.5\"/></g></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M429.8 246.1L429.9 245.6L430.4 245.1L486.1 209.4L487 209L488 208.9L489.1 208.9L490.1 209.1L499 212.6L499.7 213.1L500.1 213.6L500.1 220.9L500 221.5L499.5 222L443.8 257.6L442.9 258L441.9 258.2L440.8 258.1L439.8 257.9L430.9 254.4L430.1 254L429.8 253.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M500.1 220.9L500 221.5L500 214.1L500.1 213.6ZM500 221.5L499.5 222L499.5 214.6L500 214.1ZM499.5 222L443.8 257.6L443.8 250.3L499.5 214.6ZM443.8 257.6L442.9 258L442.9 250.7L443.8 250.3Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M442.9 258L441.9 258.2L441.9 250.8L442.9 250.7Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M441.9 258.2L440.8 258.1L440.8 250.8L441.9 250.8ZM440.8 258.1L439.8 257.9L439.8 250.5L440.8 250.8Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M439.8 257.9L430.9 254.4L430.9 247.1L439.8 250.5ZM430.9 254.4L430.1 254L430.1 246.6L430.9 247.1ZM430.1 254L429.8 253.5L429.8 246.1L430.1 246.6Z\"/><path class=\"iso-top\" d=\"M499 212.6L499.7 213.1L500.1 213.6L500 214.1L499.5 214.6L443.8 250.3L442.9 250.7L441.9 250.8L440.8 250.8L439.8 250.5L430.9 247.1L430.1 246.6L429.8 246.1L429.9 245.6L430.4 245.1L486.1 209.4L487 209L488 208.9L489.1 208.9L490.1 209.1Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M500.1 213.6L500 214.1L499.5 214.6L443.8 250.3L442.9 250.7L441.9 250.8L440.8 250.8L439.8 250.5L430.9 247.1L430.1 246.6L429.8 246.1\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M500.1 213.6L499.2 214L498.8 214.4L443.1 250L442.5 250.3L441.8 250.4L441 250.4L440.2 250.2L431.4 246.7L430.9 246.4L429.8 246.1\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M429.8 246.1L429.9 245.6L430.4 245.1L486.1 209.4L487 209L488 208.9L489.1 208.9L490.1 209.1L499 212.6L499.7 213.1L500.1 213.6M500.1 220.9L500 221.5L499.5 222L443.8 257.6L442.9 258L441.9 258.2L440.8 258.1L439.8 257.9L430.9 254.4L430.1 254L429.8 253.5M500.1 213.6L500.1 220.9M429.8 246.1L429.8 253.5\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M485.3 210.9L487.1 211.6M474.8 217.5L476.6 218.2M469.6 220.9L471.4 221.6M464.4 224.2L466.1 224.9M453.9 230.9L455.7 231.6M448.7 234.3L450.5 235M443.5 237.6L445.2 238.3M433 244.3L434.8 245\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M480 214.2L483.4 215.5M459.1 227.6L462.5 228.9M438.2 241L441.6 242.3\"/><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"496\" cy=\"214.1\" r=\"0.45\"/><circle cx=\"441.9\" cy=\"248.7\" r=\"0.45\"/><circle cx=\"479.4\" cy=\"224.7\" r=\"0.45\"/><circle cx=\"458.5\" cy=\"238.1\" r=\"0.45\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M477.4 211.6L477.5 210.7L478.2 209.8L479.2 209L480.5 208.3L482.1 207.8L483.9 207.4L485.8 207.3L487.6 207.4L489.4 207.7L491.1 208.2L492.4 208.9L493.5 209.7L494.1 210.6L494.3 211.5L494.3 216.4L494.1 217.4L493.5 218.3L492.5 219.1L491.2 219.8L489.6 220.3L487.8 220.6L485.9 220.7L484 220.6L482.2 220.3L480.6 219.8L479.3 219.1L478.2 218.3L477.6 217.5L477.4 216.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M492.5 219.1L491.2 219.8L491.2 214.9L492.5 214.2ZM491.2 219.8L489.6 220.3L489.6 215.4L491.2 214.9ZM494.3 216.4L494.1 217.4L494.1 212.5L494.3 211.5ZM494.1 217.4L493.5 218.3L493.5 213.4L494.1 212.5ZM493.5 218.3L492.5 219.1L492.5 214.2L493.5 213.4Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M489.6 220.3L487.8 220.6L487.8 215.7L489.6 215.4ZM487.8 220.6L485.9 220.7L485.9 215.8L487.8 215.7Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M485.9 220.7L484 220.6L484 215.7L485.9 215.8ZM484 220.6L482.2 220.3L482.2 215.4L484 215.7Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M482.2 220.3L480.6 219.8L480.6 214.9L482.2 215.4ZM480.6 219.8L479.3 219.1L479.3 214.2L480.6 214.9ZM479.3 219.1L478.2 218.3L478.2 213.4L479.3 214.2ZM478.2 218.3L477.6 217.5L477.6 212.5L478.2 213.4ZM477.6 217.5L477.4 216.5L477.4 211.6L477.6 212.5Z\"/><path class=\"iso-top\" d=\"M492.5 214.2L491.2 214.9L489.6 215.4L487.8 215.7L485.9 215.8L484 215.7L482.2 215.4L480.6 214.9L479.3 214.2L478.2 213.4L477.6 212.5L477.4 211.6L477.5 210.7L478.2 209.8L479.2 209L480.5 208.3L482.1 207.8L483.9 207.4L485.8 207.3L487.6 207.4L489.4 207.7L491.1 208.2L492.4 208.9L493.5 209.7L494.1 210.6L494.3 211.5L494.1 212.5L493.5 213.4Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M494.3 211.5L494.1 212.5L493.5 213.4L492.5 214.2L491.2 214.9L489.6 215.4L487.8 215.7L485.9 215.8L484 215.7L482.2 215.4L480.6 214.9L479.3 214.2L478.2 213.4L477.6 212.5L477.4 211.6\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M494.3 211.5L493.6 212.4L493 213.2L492.1 214L490.8 214.6L489.3 215.1L487.7 215.4L485.9 215.5L484.2 215.4L482.5 215.1L481 214.7L479.7 214.1L478.7 213.3L478.1 212.5L477.4 211.6\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M477.4 211.6L477.5 210.7L478.2 209.8L479.2 209L480.5 208.3L482.1 207.8L483.9 207.4L485.8 207.3L487.6 207.4L489.4 207.7L491.1 208.2L492.4 208.9L493.5 209.7L494.1 210.6L494.3 211.5M494.3 216.4L494.1 217.4L493.5 218.3L492.5 219.1L491.2 219.8L489.6 220.3L487.8 220.6L485.9 220.7L484 220.6L482.2 220.3L480.6 219.8L479.3 219.1L478.2 218.3L477.6 217.5L477.4 216.5M477.4 211.6L477.4 216.5M494.3 211.5L494.3 216.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M479.9 194.8L480 194L480.4 193.2L481.2 192.6L482.3 192L483.6 191.7L485.1 191.5L486.7 191.5L488.2 191.7L489.5 192.1L490.6 192.6L491.4 193.3L491.7 194L491.7 211.2L491.7 212L491.3 212.7L490.5 213.4L489.4 213.9L488.1 214.3L486.6 214.5L485 214.5L483.5 214.3L482.2 213.9L481.1 213.4L480.3 212.7L479.9 211.9Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M490.5 213.4L489.4 213.9L489.4 196.8L490.5 196.2ZM491.7 211.2L491.7 212L491.7 194.8L491.7 194ZM491.7 212L491.3 212.7L491.3 195.6L491.7 194.8ZM491.3 212.7L490.5 213.4L490.5 196.2L491.3 195.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M489.4 213.9L488.1 214.3L488.1 197.2L489.4 196.8ZM488.1 214.3L486.6 214.5L486.6 197.4L488.1 197.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M486.6 214.5L485 214.5L485 197.4L486.6 197.4ZM485 214.5L483.5 214.3L483.5 197.1L485 197.4Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M483.5 214.3L482.2 213.9L482.2 196.8L483.5 197.1ZM482.2 213.9L481.1 213.4L481.1 196.2L482.2 196.8ZM481.1 213.4L480.3 212.7L480.3 195.5L481.1 196.2ZM480.3 212.7L479.9 211.9L479.9 194.8L480.3 195.5Z\"/><path class=\"iso-top\" d=\"M490.5 196.2L489.4 196.8L488.1 197.2L486.6 197.4L485 197.4L483.5 197.1L482.2 196.8L481.1 196.2L480.3 195.5L479.9 194.8L480 194L480.4 193.2L481.2 192.6L482.3 192L483.6 191.7L485.1 191.5L486.7 191.5L488.2 191.7L489.5 192.1L490.6 192.6L491.4 193.3L491.7 194L491.7 194.8L491.3 195.6Z\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M479.9 194.8L480 194L480.4 193.2L481.2 192.6L482.3 192L483.6 191.7L485.1 191.5L486.7 191.5L488.2 191.7L489.5 192.1L490.6 192.6L491.4 193.3L491.7 194M491.7 211.2L491.7 212L491.3 212.7L490.5 213.4L489.4 213.9L488.1 214.3L486.6 214.5L485 214.5L483.5 214.3L482.2 213.9L481.1 213.4L480.3 212.7L479.9 211.9M479.9 194.8L479.9 211.9M491.7 194L491.7 211.2\"/></g><path class=\"iso-line\" data-tone=\"faint\" d=\"M491.8 206.7L491.7 207.2L491.3 207.8L490.8 208.3L490 208.8L489.1 209.1L488.1 209.4L487 209.6L485.8 209.6L484.7 209.6L483.6 209.4L482.5 209.1L481.6 208.8L480.9 208.3L480.4 207.8L480 207.2L479.9 206.7M491.8 199.3L491.7 199.9L491.3 200.4L490.8 201L490 201.4L489.1 201.8L488.1 202.1L487 202.2L485.8 202.3L484.7 202.2L483.6 202.1L482.5 201.8L481.6 201.4L480.9 201L480.4 200.4L480 199.9L479.9 199.3\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M478.5 193.2L478.7 192.4L479.2 191.6L480 190.9L481.2 190.3L482.6 189.9L484.1 189.6L485.8 189.5L487.4 189.6L489 189.9L490.4 190.3L491.5 190.9L492.4 191.6L493 192.3L493.2 193.1L493.2 194.4L493 195.2L492.5 196L491.6 196.7L490.5 197.3L489.1 197.7L487.5 198L485.9 198.1L484.3 198L482.7 197.7L481.3 197.3L480.1 196.7L479.2 196L478.7 195.3L478.5 194.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M491.6 196.7L490.5 197.3L490.5 196L491.6 195.4ZM490.5 197.3L489.1 197.7L489.1 196.5L490.5 196ZM493.2 194.4L493 195.2L493 194L493.2 193.1ZM493 195.2L492.5 196L492.5 194.7L493 194ZM492.5 196L491.6 196.7L491.6 195.4L492.5 194.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M489.1 197.7L487.5 198L487.5 196.8L489.1 196.5ZM487.5 198L485.9 198.1L485.9 196.9L487.5 196.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M485.9 198.1L484.3 198L484.3 196.8L485.9 196.9ZM484.3 198L482.7 197.7L482.7 196.5L484.3 196.8Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M482.7 197.7L481.3 197.3L481.3 196.1L482.7 196.5ZM481.3 197.3L480.1 196.7L480.1 195.5L481.3 196.1ZM480.1 196.7L479.2 196L479.2 194.8L480.1 195.5ZM479.2 196L478.7 195.3L478.7 194L479.2 194.8ZM478.7 195.3L478.5 194.4L478.5 193.2L478.7 194Z\"/><path class=\"iso-top\" d=\"M491.6 195.4L490.5 196L489.1 196.5L487.5 196.8L485.9 196.9L484.3 196.8L482.7 196.5L481.3 196.1L480.1 195.5L479.2 194.8L478.7 194L478.5 193.2L478.7 192.4L479.2 191.6L480 190.9L481.2 190.3L482.6 189.9L484.1 189.6L485.8 189.5L487.4 189.6L489 189.9L490.4 190.3L491.5 190.9L492.4 191.6L493 192.3L493.2 193.1L493 194L492.5 194.7Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M493.2 193.1L493 194L492.5 194.7L491.6 195.4L490.5 196L489.1 196.5L487.5 196.8L485.9 196.9L484.3 196.8L482.7 196.5L481.3 196.1L480.1 195.5L479.2 194.8L478.7 194L478.5 193.2\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M478.5 193.2L478.7 192.4L479.2 191.6L480 190.9L481.2 190.3L482.6 189.9L484.1 189.6L485.8 189.5L487.4 189.6L489 189.9L490.4 190.3L491.5 190.9L492.4 191.6L493 192.3L493.2 193.1M493.2 194.4L493 195.2L492.5 196L491.6 196.7L490.5 197.3L489.1 197.7L487.5 198L485.9 198.1L484.3 198L482.7 197.7L481.3 197.3L480.1 196.7L479.2 196L478.7 195.3L478.5 194.4M478.5 193.2L478.5 194.4M493.2 193.1L493.2 194.4\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M490.8 191.3L491.7 191M491.6 192L492.7 191.8M492 192.8L493.1 192.7M492 193.6L493.1 193.7M491.6 194.4L492.6 194.6M489.6 195.7L490.3 196.1M488.2 196.1L488.6 196.6M486.6 196.3L486.7 196.8M485 196.3L484.8 196.8M483.4 196.1L483 196.6M480.9 195.1L480 195.4M480.1 194.4L479 194.6M479.7 193.6L478.5 193.6M479.7 192.8L478.6 192.7M480.1 192L479.1 191.7M482.1 190.7L481.4 190.2M483.5 190.3L483.1 189.8M485.1 190.1L484.9 189.5M486.7 190.1L486.9 189.5M488.3 190.3L488.7 189.8\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M489 191.2L490.4 190.3M489.9 194.8L491.6 195.4M482.7 195.2L481.3 196.1M481.8 191.6L480 190.9\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M456.4 226.2L456.6 225.3L457.3 224.4L458.2 223.6L459.6 222.9L461.2 222.4L463 222L464.9 221.9L466.7 222L468.5 222.3L470.2 222.8L471.5 223.5L472.5 224.3L473.2 225.2L473.4 226.1L473.4 229.8L473.2 230.7L472.6 231.6L471.6 232.5L470.3 233.1L468.7 233.6L466.9 234L465 234.1L463.1 234L461.3 233.7L459.7 233.2L458.4 232.5L457.3 231.7L456.7 230.8L456.4 229.9Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M471.6 232.5L470.3 233.1L470.3 229.5L471.6 228.8ZM470.3 233.1L468.7 233.6L468.7 230L470.3 229.5ZM473.4 229.8L473.2 230.7L473.2 227.1L473.4 226.1ZM473.2 230.7L472.6 231.6L472.6 228L473.2 227.1ZM472.6 231.6L471.6 232.5L471.6 228.8L472.6 228Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M468.7 233.6L466.9 234L466.9 230.3L468.7 230ZM466.9 234L465 234.1L465 230.4L466.9 230.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M465 234.1L463.1 234L463.1 230.3L465 230.4ZM463.1 234L461.3 233.7L461.3 230L463.1 230.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M461.3 233.7L459.7 233.2L459.7 229.5L461.3 230ZM459.7 233.2L458.4 232.5L458.4 228.8L459.7 229.5ZM458.4 232.5L457.3 231.7L457.3 228L458.4 228.8ZM457.3 231.7L456.7 230.8L456.7 227.2L457.3 228ZM456.7 230.8L456.4 229.9L456.4 226.2L456.7 227.2Z\"/><path class=\"iso-top\" d=\"M471.6 228.8L470.3 229.5L468.7 230L466.9 230.3L465 230.4L463.1 230.3L461.3 230L459.7 229.5L458.4 228.8L457.3 228L456.7 227.2L456.4 226.2L456.6 225.3L457.3 224.4L458.2 223.6L459.6 222.9L461.2 222.4L463 222L464.9 221.9L466.7 222L468.5 222.3L470.2 222.8L471.5 223.5L472.5 224.3L473.2 225.2L473.4 226.1L473.2 227.1L472.6 228Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M473.4 226.1L473.2 227.1L472.6 228L471.6 228.8L470.3 229.5L468.7 230L466.9 230.3L465 230.4L463.1 230.3L461.3 230L459.7 229.5L458.4 228.8L457.3 228L456.7 227.2L456.4 226.2\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M473.4 226.1L472.7 227L472.1 227.9L471.2 228.6L469.9 229.2L468.4 229.7L466.8 230L465 230.1L463.2 230L461.6 229.8L460.1 229.3L458.8 228.7L457.8 227.9L457.2 227.1L456.4 226.2\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M456.4 226.2L456.6 225.3L457.3 224.4L458.2 223.6L459.6 222.9L461.2 222.4L463 222L464.9 221.9L466.7 222L468.5 222.3L470.2 222.8L471.5 223.5L472.5 224.3L473.2 225.2L473.4 226.1M473.4 229.8L473.2 230.7L472.6 231.6L471.6 232.5L470.3 233.1L468.7 233.6L466.9 234L465 234.1L463.1 234L461.3 233.7L459.7 233.2L458.4 232.5L457.3 231.7L456.7 230.8L456.4 229.9M456.4 226.2L456.4 229.9M473.4 226.1L473.4 229.8\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M459.3 216.7L459.3 216L459.7 215.3L460.5 214.6L461.5 214.1L462.8 213.7L464.2 213.6L465.7 213.6L467.1 213.8L468.4 214.1L469.5 214.7L470.2 215.3L470.6 216L470.6 225.8L470.5 226.6L470.1 227.3L469.4 227.9L468.3 228.4L467.1 228.8L465.6 229L464.1 229L462.7 228.8L461.5 228.4L460.4 227.9L459.7 227.2L459.3 226.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M469.4 227.9L468.3 228.4L468.3 218.6L469.4 218.1ZM470.6 225.8L470.5 226.6L470.5 216.8L470.6 216ZM470.5 226.6L470.1 227.3L470.1 217.5L470.5 216.8ZM470.1 227.3L469.4 227.9L469.4 218.1L470.1 217.5Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M468.3 228.4L467.1 228.8L467.1 219L468.3 218.6ZM467.1 228.8L465.6 229L465.6 219.2L467.1 219Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M465.6 229L464.1 229L464.1 219.2L465.6 219.2ZM464.1 229L462.7 228.8L462.7 219L464.1 219.2Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M462.7 228.8L461.5 228.4L461.5 218.6L462.7 219ZM461.5 228.4L460.4 227.9L460.4 218.1L461.5 218.6ZM460.4 227.9L459.7 227.2L459.7 217.4L460.4 218.1ZM459.7 227.2L459.3 226.5L459.3 216.7L459.7 217.4Z\"/><path class=\"iso-top\" d=\"M469.4 218.1L468.3 218.6L467.1 219L465.6 219.2L464.1 219.2L462.7 219L461.5 218.6L460.4 218.1L459.7 217.4L459.3 216.7L459.3 216L459.7 215.3L460.5 214.6L461.5 214.1L462.8 213.7L464.2 213.6L465.7 213.6L467.1 213.8L468.4 214.1L469.5 214.7L470.2 215.3L470.6 216L470.5 216.8L470.1 217.5Z\"/><path class=\"iso-line iso-crease\" data-tone=\"lo\" d=\"M470.6 216L470.5 216.8L470.1 217.5L469.4 218.1L468.3 218.6L467.1 219L465.6 219.2L464.1 219.2L462.7 219L461.5 218.6L460.4 218.1L459.7 217.4L459.3 216.7\"/><path class=\"iso-line iso-bevel\" data-tone=\"lo\" d=\"M470.6 216L469.8 216.7L469.5 217.3L468.8 217.9L467.9 218.3L466.8 218.7L465.5 218.8L464.2 218.8L463 218.6L461.9 218.3L461 217.9L460.3 217.3L459.3 216.7\"/><path class=\"iso-line iso-edge\" data-tone=\"hi\" d=\"M459.3 216.7L459.3 216L459.7 215.3L460.5 214.6L461.5 214.1L462.8 213.7L464.2 213.6L465.7 213.6L467.1 213.8L468.4 214.1L469.5 214.7L470.2 215.3L470.6 216M470.6 225.8L470.5 226.6L470.1 227.3L469.4 227.9L468.3 228.4L467.1 228.8L465.6 229L464.1 229L462.7 228.8L461.5 228.4L460.4 227.9L459.7 227.2L459.3 226.5M459.3 216.7L459.3 226.5M470.6 216L470.6 225.8\"/></g><path class=\"iso-line\" data-tone=\"mid\" d=\"M467.6 217.4L466.8 217.8L465.9 218L464.8 218.1L463.8 218L462.8 217.7L462.1 217.3L461.7 216.8L461.5 216.3L461.7 215.8L462.3 215.3L463 215L464 214.7L465.1 214.7L466.1 214.8L467 215L467.8 215.4L468.2 215.9L468.3 216.4L468.1 216.9Z\"/><g class=\"iso-dots\" data-tone=\"hi\"><circle cx=\"464.9\" cy=\"216.4\" r=\"0.8\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M435.5 238.4L435.7 237.4L436.3 236.5L437.3 235.7L438.7 235L440.3 234.5L442.1 234.2L443.9 234.1L445.8 234.2L447.6 234.5L449.3 235L450.6 235.6L451.6 236.4L452.3 237.3L452.5 238.3L452.5 243.2L452.3 244.1L451.7 245L450.7 245.8L449.4 246.5L447.8 247L446 247.4L444.1 247.5L442.2 247.4L440.4 247.1L438.8 246.6L437.4 245.9L436.4 245.1L435.8 244.2L435.5 243.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M450.7 245.8L449.4 246.5L449.4 241.6L450.7 240.9ZM449.4 246.5L447.8 247L447.8 242.1L449.4 241.6ZM452.5 243.2L452.3 244.1L452.3 239.2L452.5 238.3ZM452.3 244.1L451.7 245L451.7 240.1L452.3 239.2ZM451.7 245L450.7 245.8L450.7 240.9L451.7 240.1Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M447.8 247L446 247.4L446 242.4L447.8 242.1ZM446 247.4L444.1 247.5L444.1 242.6L446 242.4Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M444.1 247.5L442.2 247.4L442.2 242.5L444.1 242.6ZM442.2 247.4L440.4 247.1L440.4 242.2L442.2 242.5Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M440.4 247.1L438.8 246.6L438.8 241.7L440.4 242.2ZM438.8 246.6L437.4 245.9L437.4 241L438.8 241.7ZM437.4 245.9L436.4 245.1L436.4 240.2L437.4 241ZM436.4 245.1L435.8 244.2L435.8 239.3L436.4 240.2ZM435.8 244.2L435.5 243.3L435.5 238.4L435.8 239.3Z\"/><path class=\"iso-top\" d=\"M450.7 240.9L449.4 241.6L447.8 242.1L446 242.4L444.1 242.6L442.2 242.5L440.4 242.2L438.8 241.7L437.4 241L436.4 240.2L435.8 239.3L435.5 238.4L435.7 237.4L436.3 236.5L437.3 235.7L438.7 235L440.3 234.5L442.1 234.2L443.9 234.1L445.8 234.2L447.6 234.5L449.3 235L450.6 235.6L451.6 236.4L452.3 237.3L452.5 238.3L452.3 239.2L451.7 240.1Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M452.5 238.3L452.3 239.2L451.7 240.1L450.7 240.9L449.4 241.6L447.8 242.1L446 242.4L444.1 242.6L442.2 242.5L440.4 242.2L438.8 241.7L437.4 241L436.4 240.2L435.8 239.3L435.5 238.4\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M452.5 238.3L451.8 239.2L451.2 240L450.3 240.8L449 241.4L447.5 241.9L445.9 242.2L444.1 242.3L442.3 242.2L440.7 241.9L439.2 241.4L437.9 240.8L436.9 240.1L436.3 239.2L435.5 238.4\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M435.5 238.4L435.7 237.4L436.3 236.5L437.3 235.7L438.7 235L440.3 234.5L442.1 234.2L443.9 234.1L445.8 234.2L447.6 234.5L449.3 235L450.6 235.6L451.6 236.4L452.3 237.3L452.5 238.3M452.5 243.2L452.3 244.1L451.7 245L450.7 245.8L449.4 246.5L447.8 247L446 247.4L444.1 247.5L442.2 247.4L440.4 247.1L438.8 246.6L437.4 245.9L436.4 245.1L435.8 244.2L435.5 243.3M435.5 238.4L435.5 243.3M452.5 238.3L452.5 243.2\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M438.1 221.5L438.1 220.8L438.6 220L439.3 219.3L440.5 218.8L441.8 218.4L443.3 218.2L444.9 218.2L446.4 218.4L447.7 218.8L448.8 219.4L449.5 220.1L449.9 220.8L449.9 238L449.9 238.7L449.5 239.5L448.7 240.2L447.6 240.7L446.3 241.1L444.8 241.3L443.2 241.3L441.7 241.1L440.4 240.7L439.3 240.1L438.5 239.4L438.1 238.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M448.7 240.2L447.6 240.7L447.6 223.5L448.7 223ZM449.9 238L449.9 238.7L449.9 221.6L449.9 220.8ZM449.9 238.7L449.5 239.5L449.5 222.3L449.9 221.6ZM449.5 239.5L448.7 240.2L448.7 223L449.5 222.3Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M447.6 240.7L446.3 241.1L446.3 223.9L447.6 223.5ZM446.3 241.1L444.8 241.3L444.8 224.1L446.3 223.9Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M444.8 241.3L443.2 241.3L443.2 224.1L444.8 224.1ZM443.2 241.3L441.7 241.1L441.7 223.9L443.2 224.1Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M441.7 241.1L440.4 240.7L440.4 223.5L441.7 223.9ZM440.4 240.7L439.3 240.1L439.3 223L440.4 223.5ZM439.3 240.1L438.5 239.4L438.5 222.3L439.3 223ZM438.5 239.4L438.1 238.7L438.1 221.5L438.5 222.3Z\"/><path class=\"iso-top\" d=\"M448.7 223L447.6 223.5L446.3 223.9L444.8 224.1L443.2 224.1L441.7 223.9L440.4 223.5L439.3 223L438.5 222.3L438.1 221.5L438.1 220.8L438.6 220L439.3 219.3L440.5 218.8L441.8 218.4L443.3 218.2L444.9 218.2L446.4 218.4L447.7 218.8L448.8 219.4L449.5 220.1L449.9 220.8L449.9 221.6L449.5 222.3Z\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M438.1 221.5L438.1 220.8L438.6 220L439.3 219.3L440.5 218.8L441.8 218.4L443.3 218.2L444.9 218.2L446.4 218.4L447.7 218.8L448.8 219.4L449.5 220.1L449.9 220.8M449.9 238L449.9 238.7L449.5 239.5L448.7 240.2L447.6 240.7L446.3 241.1L444.8 241.3L443.2 241.3L441.7 241.1L440.4 240.7L439.3 240.1L438.5 239.4L438.1 238.7M438.1 221.5L438.1 238.7M449.9 220.8L449.9 238\"/></g><path class=\"iso-line\" data-tone=\"faint\" d=\"M450 233.4L449.9 234L449.5 234.6L449 235.1L448.2 235.5L447.3 235.9L446.3 236.2L445.2 236.3L444 236.4L442.9 236.3L441.8 236.2L440.7 235.9L439.8 235.5L439.1 235.1L438.5 234.6L438.2 234L438.1 233.4M450 226.1L449.9 226.6L449.5 227.2L449 227.7L448.2 228.2L447.3 228.5L446.3 228.8L445.2 229L444 229L442.9 229L441.8 228.8L440.7 228.5L439.8 228.2L439.1 227.7L438.5 227.2L438.2 226.6L438.1 226.1\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M436.7 220L436.8 219.2L437.4 218.4L438.2 217.7L439.4 217.1L440.8 216.6L442.3 216.4L444 216.3L445.6 216.3L447.2 216.6L448.6 217L449.7 217.6L450.6 218.3L451.2 219.1L451.4 219.9L451.4 221.1L451.2 222L450.7 222.7L449.8 223.4L448.7 224L447.3 224.5L445.7 224.7L444.1 224.8L442.5 224.8L440.9 224.5L439.5 224.1L438.3 223.5L437.4 222.8L436.9 222L436.7 221.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M449.8 223.4L448.7 224L448.7 222.8L449.8 222.2ZM448.7 224L447.3 224.5L447.3 223.2L448.7 222.8ZM451.4 221.1L451.2 222L451.2 220.7L451.4 219.9ZM451.2 222L450.7 222.7L450.7 221.5L451.2 220.7ZM450.7 222.7L449.8 223.4L449.8 222.2L450.7 221.5Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M447.3 224.5L445.7 224.7L445.7 223.5L447.3 223.2ZM445.7 224.7L444.1 224.8L444.1 223.6L445.7 223.5Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M444.1 224.8L442.5 224.8L442.5 223.5L444.1 223.6ZM442.5 224.8L440.9 224.5L440.9 223.3L442.5 223.5Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M440.9 224.5L439.5 224.1L439.5 222.8L440.9 223.3ZM439.5 224.1L438.3 223.5L438.3 222.3L439.5 222.8ZM438.3 223.5L437.4 222.8L437.4 221.6L438.3 222.3ZM437.4 222.8L436.9 222L436.9 220.8L437.4 221.6ZM436.9 222L436.7 221.2L436.7 220L436.9 220.8Z\"/><path class=\"iso-top\" d=\"M449.8 222.2L448.7 222.8L447.3 223.2L445.7 223.5L444.1 223.6L442.5 223.5L440.9 223.3L439.5 222.8L438.3 222.3L437.4 221.6L436.9 220.8L436.7 220L436.8 219.2L437.4 218.4L438.2 217.7L439.4 217.1L440.8 216.6L442.3 216.4L444 216.3L445.6 216.3L447.2 216.6L448.6 217L449.7 217.6L450.6 218.3L451.2 219.1L451.4 219.9L451.2 220.7L450.7 221.5Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M451.4 219.9L451.2 220.7L450.7 221.5L449.8 222.2L448.7 222.8L447.3 223.2L445.7 223.5L444.1 223.6L442.5 223.5L440.9 223.3L439.5 222.8L438.3 222.3L437.4 221.6L436.9 220.8L436.7 220\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M436.7 220L436.8 219.2L437.4 218.4L438.2 217.7L439.4 217.1L440.8 216.6L442.3 216.4L444 216.3L445.6 216.3L447.2 216.6L448.6 217L449.7 217.6L450.6 218.3L451.2 219.1L451.4 219.9M451.4 221.1L451.2 222L450.7 222.7L449.8 223.4L448.7 224L447.3 224.5L445.7 224.7L444.1 224.8L442.5 224.8L440.9 224.5L439.5 224.1L438.3 223.5L437.4 222.8L436.9 222L436.7 221.2M436.7 220L436.7 221.2M451.4 219.9L451.4 221.1\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M449 218.1L449.9 217.7M449.8 218.8L450.9 218.6M450.2 219.6L451.3 219.5M450.2 220.4L451.3 220.5M449.8 221.2L450.8 221.4M447.8 222.4L448.5 222.9M446.4 222.8L446.8 223.4M444.8 223L444.9 223.6M443.2 223L443 223.6M441.6 222.8L441.2 223.3M439.1 221.8L438.2 222.2M438.3 221.1L437.2 221.3M437.9 220.3L436.7 220.4M437.9 219.5L436.7 219.4M438.3 218.7L437.3 218.5M440.3 217.5L439.6 217M441.7 217.1L441.3 216.5M443.3 216.9L443.1 216.3M444.9 216.9L445.1 216.3M446.5 217.1L446.9 216.6\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M447.2 217.9L448.6 217M448 221.5L449.8 222.2M440.9 221.9L439.5 222.8M440 218.4L438.2 217.7\"/><g data-part=\"arms\"><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M460 184.6L462.4 182.5L495.7 191.9L495.7 194.6L493.3 196.7L460 187.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M495.7 194.6L493.3 196.7L493.3 194L495.7 191.9Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M493.3 196.7L460 187.3L460 184.6L493.3 194Z\"/><path class=\"iso-top\" d=\"M493.3 194L460 184.6L462.4 182.5L495.7 191.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M495.7 191.9L493.3 194L460 184.6\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M495.7 191.9L493.2 193.8L460 184.6\"/><path class=\"iso-line iso-edge\" data-tone=\"hi\" d=\"M460 184.6L462.4 182.5L495.7 191.9M495.7 194.6L493.3 196.7L460 187.3M460 184.6L460 187.3M495.7 191.9L495.7 194.6\"/></g><g class=\"iso-dots\" data-tone=\"hi\"><circle cx=\"485.8\" cy=\"190.5\" r=\"0.6\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M422.8 207.8L426.3 206.1L452.6 220L452.6 222.7L449.1 224.4L422.8 210.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M452.6 222.7L449.1 224.4L449.1 221.7L452.6 220Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M449.1 224.4L422.8 210.5L422.8 207.8L449.1 221.7Z\"/><path class=\"iso-top\" d=\"M449.1 221.7L422.8 207.8L426.3 206.1L452.6 220Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M452.6 220L449.1 221.7L422.8 207.8\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M452.6 220L449.1 221.5L422.8 207.8\"/><path class=\"iso-line iso-edge\" data-tone=\"hi\" d=\"M422.8 207.8L426.3 206.1L452.6 220M452.6 222.7L449.1 224.4L422.8 210.5M422.8 207.8L422.8 210.5M452.6 220L452.6 222.7\"/></g><g class=\"iso-dots\" data-tone=\"hi\"><circle cx=\"444\" cy=\"217.2\" r=\"0.6\"/></g></g><g class=\"iso-wire\" data-tone=\"lo\"><path class=\"iso-line\" data-tone=\"lo\" d=\"M437.1 247.7L431.8 251L431.8 258.4L408.4 257.3\"/><circle class=\"iso-wire-end\" cx=\"437.1\" cy=\"247.7\" r=\"0.9\"/><circle class=\"iso-wire-end\" cx=\"408.4\" cy=\"257.3\" r=\"0.9\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M381.5 251.3L381.6 250.1L382.1 249.1L383 248L384.2 247.1L385.7 246.3L387.5 245.6L389.5 245.1L391.6 244.8L393.8 244.7L396 244.7L398.2 245L400.2 245.4L402.1 246L403.7 246.8L405 247.7L406 248.6L406.7 249.7L407 250.8L407 256.9L406.9 258L406.4 259.1L405.5 260.1L404.3 261.1L402.8 261.9L401 262.6L399 263.1L396.9 263.4L394.7 263.5L392.5 263.5L390.3 263.2L388.3 262.8L386.4 262.2L384.8 261.4L383.4 260.5L382.4 259.5L381.8 258.5L381.5 257.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M404.3 261.1L402.8 261.9L402.8 255.8L404.3 255ZM402.8 261.9L401 262.6L401 256.4L402.8 255.8ZM407 256.9L406.9 258L406.9 251.9L407 250.8ZM406.9 258L406.4 259.1L406.4 253L406.9 251.9ZM406.4 259.1L405.5 260.1L405.5 254L406.4 253ZM405.5 260.1L404.3 261.1L404.3 255L405.5 254Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M401 262.6L399 263.1L399 256.9L401 256.4ZM399 263.1L396.9 263.4L396.9 257.3L399 256.9ZM396.9 263.4L394.7 263.5L394.7 257.4L396.9 257.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M394.7 263.5L392.5 263.5L392.5 257.3L394.7 257.4ZM392.5 263.5L390.3 263.2L390.3 257.1L392.5 257.3ZM390.3 263.2L388.3 262.8L388.3 256.7L390.3 257.1Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M388.3 262.8L386.4 262.2L386.4 256L388.3 256.7ZM386.4 262.2L384.8 261.4L384.8 255.3L386.4 256ZM384.8 261.4L383.4 260.5L383.4 254.4L384.8 255.3ZM383.4 260.5L382.4 259.5L382.4 253.4L383.4 254.4ZM382.4 259.5L381.8 258.5L381.8 252.4L382.4 253.4ZM381.8 258.5L381.5 257.4L381.5 251.3L381.8 252.4Z\"/><path class=\"iso-top\" d=\"M404.3 255L402.8 255.8L401 256.4L399 256.9L396.9 257.3L394.7 257.4L392.5 257.3L390.3 257.1L388.3 256.7L386.4 256L384.8 255.3L383.4 254.4L382.4 253.4L381.8 252.4L381.5 251.3L381.6 250.1L382.1 249.1L383 248L384.2 247.1L385.7 246.3L387.5 245.6L389.5 245.1L391.6 244.8L393.8 244.7L396 244.7L398.2 245L400.2 245.4L402.1 246L403.7 246.8L405 247.7L406 248.6L406.7 249.7L407 250.8L406.9 251.9L406.4 253L405.5 254Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M407 250.8L406.9 251.9L406.4 253L405.5 254L404.3 255L402.8 255.8L401 256.4L399 256.9L396.9 257.3L394.7 257.4L392.5 257.3L390.3 257.1L388.3 256.7L386.4 256L384.8 255.3L383.4 254.4L382.4 253.4L381.8 252.4L381.5 251.3\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M381.5 251.3L381.6 250.1L382.1 249.1L383 248L384.2 247.1L385.7 246.3L387.5 245.6L389.5 245.1L391.6 244.8L393.8 244.7L396 244.7L398.2 245L400.2 245.4L402.1 246L403.7 246.8L405 247.7L406 248.6L406.7 249.7L407 250.8M407 256.9L406.9 258L406.4 259.1L405.5 260.1L404.3 261.1L402.8 261.9L401 262.6L399 263.1L396.9 263.4L394.7 263.5L392.5 263.5L390.3 263.2L388.3 262.8L386.4 262.2L384.8 261.4L383.4 260.5L382.4 259.5L381.8 258.5L381.5 257.4M381.5 251.3L381.5 257.4M407 250.8L407 256.9\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M375.9 241.3L375.9 240.3L376.3 239.3L376.8 238.3L377.6 237.3L378.6 236.4L379.7 235.6L381.1 234.8L382.6 234.1L384.3 233.5L386.1 233L388 232.6L390 232.3L392 232.1L394.1 232L396.1 232.1L398.2 232.2L400.1 232.5L402.1 232.9L403.9 233.4L405.6 234L407.1 234.7L408.5 235.4L409.7 236.3L410.7 237.2L411.5 238.1L412.1 239.1L412.5 240.1L412.6 241.1L412.6 250.9L412.5 252L412.2 253L411.7 254L410.9 254.9L409.9 255.8L408.7 256.7L407.4 257.5L405.9 258.2L404.2 258.8L402.4 259.3L400.5 259.7L398.5 260L396.5 260.2L394.4 260.2L392.4 260.2L390.3 260L388.3 259.7L386.4 259.4L384.6 258.9L382.9 258.3L381.4 257.6L380 256.8L378.8 256L377.8 255.1L376.9 254.2L376.4 253.2L376 252.2L375.9 251.1Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M408.7 256.7L407.4 257.5L407.4 247.7L408.7 246.9ZM407.4 257.5L405.9 258.2L405.9 248.4L407.4 247.7ZM405.9 258.2L404.2 258.8L404.2 249L405.9 248.4ZM412.6 250.9L412.5 252L412.5 242.2L412.6 241.1ZM412.5 252L412.2 253L412.2 243.2L412.5 242.2ZM412.2 253L411.7 254L411.7 244.2L412.2 243.2ZM411.7 254L410.9 254.9L410.9 245.1L411.7 244.2ZM410.9 254.9L409.9 255.8L409.9 246L410.9 245.1ZM409.9 255.8L408.7 256.7L408.7 246.9L409.9 246Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M404.2 258.8L402.4 259.3L402.4 249.5L404.2 249ZM402.4 259.3L400.5 259.7L400.5 249.9L402.4 249.5ZM400.5 259.7L398.5 260L398.5 250.2L400.5 249.9ZM398.5 260L396.5 260.2L396.5 250.4L398.5 250.2ZM396.5 260.2L394.4 260.2L394.4 250.4L396.5 250.4Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M394.4 260.2L392.4 260.2L392.4 250.4L394.4 250.4ZM392.4 260.2L390.3 260L390.3 250.2L392.4 250.4ZM390.3 260L388.3 259.7L388.3 249.9L390.3 250.2ZM388.3 259.7L386.4 259.4L386.4 249.6L388.3 249.9ZM386.4 259.4L384.6 258.9L384.6 249.1L386.4 249.6Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M384.6 258.9L382.9 258.3L382.9 248.5L384.6 249.1ZM382.9 258.3L381.4 257.6L381.4 247.8L382.9 248.5ZM381.4 257.6L380 256.8L380 247L381.4 247.8ZM380 256.8L378.8 256L378.8 246.2L380 247ZM378.8 256L377.8 255.1L377.8 245.3L378.8 246.2ZM377.8 255.1L376.9 254.2L376.9 244.4L377.8 245.3ZM376.9 254.2L376.4 253.2L376.4 243.4L376.9 244.4ZM376.4 253.2L376 252.2L376 242.4L376.4 243.4ZM376 252.2L375.9 251.1L375.9 241.3L376 242.4Z\"/><path class=\"iso-top\" d=\"M408.7 246.9L407.4 247.7L405.9 248.4L404.2 249L402.4 249.5L400.5 249.9L398.5 250.2L396.5 250.4L394.4 250.4L392.4 250.4L390.3 250.2L388.3 249.9L386.4 249.6L384.6 249.1L382.9 248.5L381.4 247.8L380 247L378.8 246.2L377.8 245.3L376.9 244.4L376.4 243.4L376 242.4L375.9 241.3L375.9 240.3L376.3 239.3L376.8 238.3L377.6 237.3L378.6 236.4L379.7 235.6L381.1 234.8L382.6 234.1L384.3 233.5L386.1 233L388 232.6L390 232.3L392 232.1L394.1 232L396.1 232.1L398.2 232.2L400.1 232.5L402.1 232.9L403.9 233.4L405.6 234L407.1 234.7L408.5 235.4L409.7 236.3L410.7 237.2L411.5 238.1L412.1 239.1L412.5 240.1L412.6 241.1L412.5 242.2L412.2 243.2L411.7 244.2L410.9 245.1L409.9 246Z\"/><path class=\"iso-line iso-crease\" data-tone=\"lo\" d=\"M412.6 241.1L412.5 242.2L412.2 243.2L411.7 244.2L410.9 245.1L409.9 246L408.7 246.9L407.4 247.7L405.9 248.4L404.2 249L402.4 249.5L400.5 249.9L398.5 250.2L396.5 250.4L394.4 250.4L392.4 250.4L390.3 250.2L388.3 249.9L386.4 249.6L384.6 249.1L382.9 248.5L381.4 247.8L380 247L378.8 246.2L377.8 245.3L376.9 244.4L376.4 243.4L376 242.4L375.9 241.3\"/><path class=\"iso-line iso-bevel\" data-tone=\"lo\" d=\"M412.6 241.1L411.6 242.1L411.2 243.1L410.7 244L410 244.9L409.1 245.8L408 246.6L406.7 247.3L405.2 248L403.6 248.6L401.9 249L400.2 249.4L398.3 249.7L396.4 249.9L394.4 249.9L392.5 249.9L390.5 249.7L388.7 249.5L386.8 249.1L385.1 248.6L383.5 248.1L382.1 247.4L380.7 246.7L379.6 245.9L378.6 245.1L377.9 244.2L377.3 243.3L377 242.3L375.9 241.3\"/><path class=\"iso-line iso-edge\" data-tone=\"hi\" d=\"M375.9 241.3L375.9 240.3L376.3 239.3L376.8 238.3L377.6 237.3L378.6 236.4L379.7 235.6L381.1 234.8L382.6 234.1L384.3 233.5L386.1 233L388 232.6L390 232.3L392 232.1L394.1 232L396.1 232.1L398.2 232.2L400.1 232.5L402.1 232.9L403.9 233.4L405.6 234L407.1 234.7L408.5 235.4L409.7 236.3L410.7 237.2L411.5 238.1L412.1 239.1L412.5 240.1L412.6 241.1M412.6 250.9L412.5 252L412.2 253L411.7 254L410.9 254.9L409.9 255.8L408.7 256.7L407.4 257.5L405.9 258.2L404.2 258.8L402.4 259.3L400.5 259.7L398.5 260L396.5 260.2L394.4 260.2L392.4 260.2L390.3 260L388.3 259.7L386.4 259.4L384.6 258.9L382.9 258.3L381.4 257.6L380 256.8L378.8 256L377.8 255.1L376.9 254.2L376.4 253.2L376 252.2L375.9 251.1M375.9 241.3L375.9 251.1M412.6 241.1L412.6 250.9\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M408.7 250.2L408.7 247.3M407.5 250.9L407.5 248M406.1 251.6L406.1 248.6M404.5 252.2L404.5 249.2M402.9 252.7L402.9 249.7M401.1 253.1L401.1 250.1M399.3 253.4L399.3 250.4M397.4 253.6L397.4 250.7M395.5 253.7L395.5 250.8M393.6 253.7L393.6 250.8M391.7 253.6L391.7 250.7M389.8 253.5L389.8 250.5M388 253.2L388 250.2M386.2 252.8L386.2 249.9M384.5 252.3L384.5 249.4M382.9 251.8L382.9 248.8M381.5 251.2L381.5 248.2M380.2 250.4L380.2 247.5M379 249.7L379 246.7M378 248.9L378 245.9M377.2 248L377.2 245M376.6 247.1L376.6 244.1M376.1 246.1L376.1 243.2M412.1 246.8L412.1 243.8M411.5 247.7L411.5 244.7M410.8 248.6L410.8 245.6M409.8 249.4L409.8 246.5\"/><path class=\"iso-line\" data-tone=\"faint\" d=\"M412.6 244.9L412.5 245.8L412.3 246.7L411.8 247.6L411.2 248.4L410.5 249.2L409.5 250L408.5 250.7L407.2 251.4L405.9 252L404.5 252.6L402.9 253L401.3 253.4L399.6 253.7L397.8 253.9L396 254.1L394.2 254.1L392.4 254.1L390.7 253.9L388.9 253.7L387.2 253.4L385.6 253L384 252.6L382.6 252L381.2 251.4L380 250.7L378.9 250L378 249.2L377.2 248.4L376.6 247.6L376.2 246.7L375.9 245.8L375.8 244.9\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M406.7 246.1L405.6 246.8L404.2 247.4L402.8 247.9L401.3 248.3L399.6 248.7L397.9 248.9L396.2 249.1L394.4 249.2L392.6 249.1L390.9 249L389.2 248.7L387.5 248.4L385.9 248L384.5 247.5L383.2 246.9L382 246.2L380.9 245.5L380 244.7L379.3 243.9L378.8 243.1L378.5 242.2L378.4 241.3L378.5 240.4L378.8 239.5L379.2 238.7L379.9 237.9L380.7 237.1L381.8 236.4L382.9 235.7L384.2 235.1L385.7 234.6L387.2 234.1L388.9 233.8L390.6 233.5L392.3 233.4L394.1 233.3L395.9 233.3L397.6 233.5L399.3 233.7L401 234.1L402.5 234.5L404 235L405.3 235.6L406.5 236.2L407.6 236.9L408.4 237.7L409.1 238.5L409.7 239.4L410 240.3L410.1 241.2L410 242L409.7 242.9L409.3 243.8L408.6 244.6L407.7 245.4Z\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M403.8 236.5L404.9 235.9M404.9 237.1L406.1 236.7M405.8 237.8L407.2 237.4M406.6 238.6L408 238.3M407.5 240.2L409.1 240.1M407.7 241L409.2 241M407.6 241.9L409.2 242M407.3 242.7L408.9 242.9M406.2 244.3L407.6 244.7M405.3 245L406.6 245.5M404.3 245.7L405.5 246.2M403.1 246.3L404.1 246.9M400.3 247.2L401 247.9M398.8 247.6L399.3 248.3M397.1 247.8L397.5 248.6M395.5 247.9L395.6 248.7M392.1 247.9L391.8 248.6M390.4 247.7L390 248.4M388.9 247.4L388.2 248.1M387.4 247L386.6 247.7M384.7 246L383.6 246.5M383.6 245.3L382.4 245.8M382.6 244.6L381.3 245M381.9 243.9L380.5 244.2M381 242.3L379.4 242.4M380.8 241.4L379.3 241.4M380.9 240.6L379.3 240.5M381.1 239.7L379.6 239.6M382.3 238.2L380.9 237.8M383.2 237.4L381.9 237M384.2 236.8L383 236.3M385.4 236.2L384.4 235.6M388.2 235.2L387.5 234.5M389.7 234.9L389.2 234.2M391.4 234.7L391 233.9M393 234.5L392.9 233.8M396.4 234.6L396.6 233.8M398 234.8L398.5 234M399.6 235.1L400.2 234.4M401.1 235.5L401.9 234.8\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M401.4 236.7L403.5 235.3M405.4 239.6L408.7 239.2M405.1 243.2L408.3 243.8M400.7 246L402.6 247.4M393.8 247L393.7 248.7M387.1 245.8L385 247.1M383.1 242.8L379.8 243.3M383.3 239.2L380.1 238.7M387.8 236.4L385.9 235M394.6 235.4L394.8 233.7\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M378.7 251.5L378.9 251.2L380.3 250.3L380.9 250.1L381.7 250L382.3 250.2L384.6 251L385 251.3L385.1 251.7L385.1 257.2L384.8 257.5L383.4 258.4L382.8 258.6L382.1 258.7L381.4 258.5L379.2 257.7L378.8 257.4L378.7 257Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M385.1 257.2L384.8 257.5L384.8 252L385.1 251.7ZM384.8 257.5L383.4 258.4L383.4 252.9L384.8 252ZM383.4 258.4L382.8 258.6L382.8 253.1L383.4 252.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M382.8 258.6L382.1 258.7L382.1 253.2L382.8 253.1Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M382.1 258.7L381.4 258.5L381.4 253L382.1 253.2Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M381.4 258.5L379.2 257.7L379.2 252.2L381.4 253ZM379.2 257.7L378.8 257.4L378.8 251.9L379.2 252.2ZM378.8 257.4L378.7 257L378.7 251.5L378.8 251.9Z\"/><path class=\"iso-top\" d=\"M384.6 251L385 251.3L385.1 251.7L384.8 252L383.4 252.9L382.8 253.1L382.1 253.2L381.4 253L379.2 252.2L378.8 251.9L378.7 251.5L378.9 251.2L380.3 250.3L380.9 250.1L381.7 250L382.3 250.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M385.1 251.7L384.8 252L383.4 252.9L382.8 253.1L382.1 253.2L381.4 253L379.2 252.2L378.8 251.9L378.7 251.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M378.7 251.5L378.9 251.2L380.3 250.3L380.9 250.1L381.7 250L382.3 250.2L384.6 251L385 251.3L385.1 251.7M385.1 257.2L384.8 257.5L383.4 258.4L382.8 258.6L382.1 258.7L381.4 258.5L379.2 257.7L378.8 257.4L378.7 257M385.1 251.7L385.1 257.2M378.7 251.5L378.7 257\"/></g><path class=\"iso-line\" data-tone=\"mid\" d=\"M395.8 241.8L395.1 242.1L394.3 242.2L393.4 242.1L392.7 241.9L392.3 241.5L392.3 241L392.7 240.6L393.4 240.3L394.2 240.2L395.1 240.3L395.8 240.6L396.2 241L396.2 241.4Z\"/><path data-part=\"needle\" class=\"iso-line\" data-tone=\"lit\" data-free=\"start\" d=\"M393.9 239.2L395.6 247.7\" style=\"stroke-width:1.1\"/></svg></div></div><figcaption class=\"iso-legend\"><span class=\"iso-keys\"><span class=\"iso-key\"><svg class=\"iso-swatch\" data-mark=\"lit\" viewBox=\"0 0 16 10\" aria-hidden=\"true\"><path d=\"M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z\"/><path class=\"iso-swatch-crease\" d=\"M2 4.5 8 7.5 14 4.5\"/></svg>La estrella y las dos líneas de visión, en enero y en julio</span><span class=\"iso-key\"><svg class=\"iso-swatch\" data-mark=\"raised\" viewBox=\"0 0 16 10\" aria-hidden=\"true\"><path d=\"M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z\"/><path class=\"iso-swatch-crease\" d=\"M2 4.5 8 7.5 14 4.5\"/></svg>Barra de la órbita terrestre, con el Sol en el centro</span><span class=\"iso-key\"><svg class=\"iso-swatch\" data-mark=\"dashed\" viewBox=\"0 0 16 10\" aria-hidden=\"true\"><path d=\"M1.5 5h13\"/></svg>Dónde se ve la estrella sobre el fondo lejano</span></span><span class=\"iso-caption\">Al alejar la estrella, las dos miras giran menos y los puntos del fondo se juntan. El dial marca el paralaje real, p = 1/d: una vuelta es un segundo de arco. La maqueta exagera los ángulos unas 80 000 veces; a escala, la barra mediría menos que el grosor de un cabello.</span></figcaption></figure>";

function mount(host) {
  const theme = () => { const t = document.documentElement.getAttribute("data-theme"); return t === "dark" || t === "light" ? t : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); };
  host.innerHTML = '<div class="iso" data-theme="' + theme() + '">' + HTML + "</div>";
  const wrap = host.firstChild, retheme = () => wrap.setAttribute("data-theme", theme());
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", retheme);
  new MutationObserver(retheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const stage = host.querySelector(".iso-stage"), svg = stage.querySelector("svg");
  const carriage = svg.querySelector('[data-part="carriage"]'), sight = svg.querySelector('[data-part="sight"]'), arms = svg.querySelector('[data-part="arms"]'), needle = svg.querySelector('[data-part="needle"]');
  const readout = host.querySelector("[data-readout]");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const fmt = (v, n) => v.toFixed(n).replace(".", ",");
  let s = 158.4, target = s, drawn = -1, frame = 0, last = 0, clock = 0, touring = !still.matches, visible = false, idle = 0;
  const order = [2, 3, 2, 1, 0, 1];
  function draw() {
    if (s === drawn) return; drawn = s;
    carriage.setAttribute("transform", translateAlong(P, [BX - s, 0, 0]));
    sight.innerHTML = sightAt(s); arms.innerHTML = armsAt(s);
    needle.setAttribute("d", needleAt(PC / s));
    const i = STOPS.findIndex((x) => Math.abs(x - s) < 1.2);
    const text = (i < 0 ? "" : STARS[i][0] + " · ") + "d = " + fmt(s / PC, 2) + " pc · p = " + fmt(PC / s, 3) + "″";
    if (readout.textContent !== text) readout.textContent = text;
    stage.setAttribute("aria-valuenow", fmt(s / PC, 2)); stage.setAttribute("aria-valuetext", text);
  }
  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60; last = now;
    if (touring) { clock += dt; target = STOPS[order[Math.floor(clock / 2.8) % order.length]]; }
    s = still.matches ? target : s + (target - s) * (1 - Math.exp(-dt / 0.32));
    if (Math.abs(target - s) < 0.02) s = target;
    draw();
    frame = visible && (touring || s !== target) ? requestAnimationFrame(tick) : 0;
  }
  const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
  const steer = (next) => { touring = false; target = clamp(next, REACH[0], REACH[1]); clearTimeout(idle); idle = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 6000); run(); };
  new IntersectionObserver((es) => { visible = es[es.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
  stage.addEventListener("pointermove", (ev) => {
    const box = svg.getBoundingClientRect(), share = clamp(((ev.clientX - box.left) / box.width - 0.18) / 0.5, 0, 1);
    steer(REACH[1] - share * (REACH[1] - REACH[0]));
  });
  stage.addEventListener("keydown", (ev) => {
    const here = STOPS.reduce((b, x, i) => (Math.abs(x - target) < Math.abs(STOPS[b] - target) ? i : b), 0);
    let to = null;
    if (ev.key === "ArrowRight" || ev.key === "ArrowDown") to = Math.max(0, here - 1);
    if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") to = Math.min(STOPS.length - 1, here + 1);
    if (ev.key === "Home") to = 0;
    if (ev.key === "End") to = STOPS.length - 1;
    if (to === null) return;
    ev.preventDefault(); steer(STOPS[to]);
  });
  draw();
}

if (!document.getElementById("iso-css")) { const st = document.createElement("style"); st.id = "iso-css"; st.textContent = ISO_CSS + ".iso-figure{margin:4px 0 18px}.iso-stage{outline-offset:4px;touch-action:pan-y}.iso-legend{font-size:.85rem}@media(max-width:600px){.iso-plate-corner[data-corner=hint]{display:none}}"; document.head.appendChild(st); }
(window.FIGS = window.FIGS || {}).paralaje = mount;
})();
