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

const P = {"origin":[320,331.19818418646116],"scale":1.3287957287509002,"azimuth":52,"elevation":30}, K = 0.1, ZM = 18, ZC = 128, ZC2 = 142, ZS = 135, ZTOP = 180, REACH = [100,320], STOPS = [114,150,200,254,305];

const ringPt = (R, deg, z) => [R * Math.cos(deg * Math.PI / 180), R * Math.sin(deg * Math.PI / 180), z];
const liveAt = (mm) => {
  const r = mm * K, R = r + 5, sec = Math.max(2.4, r * 0.2);
  let out = solidSvg(cylinder(0, 0, r, ZM, 2.5, P, 44, 0.5), { tone: "hi", lit: true });
  out += lineSvg(ring(0, 0, r * 0.2, ZM + 2.5, P, 20), { tone: "mid" });
  const hits = [[-0.74, 0], [0, -0.74], [0.74, 0], [0, 0.74]].map(([a, b]) => [a * r, b * r]);
  let back = "", down = "";
  for (const [x, y] of hits) {
    back += segment([x, y, ZM + 2.5], [x * 0.2, y * 0.2, ZS], P);
    down += segment([x, y, ZTOP], [x, y, ZM + 2.5], P);
  }
  out += lineSvg(back, { tone: "mid", dashed: true }) + lineSvg(down, { tone: "lit" });
  // celosía: de las esquinas de la caja al anillo inferior de la jaula
  let truss = "";
  for (const [cx, cy, deg] of [[-35, -35, 225], [35, -35, 315], [-35, 35, 135], [35, 35, 45]]) {
    truss += segment([cx, cy, ZM], ringPt(R, deg - 24, ZC), P) + segment([cx, cy, ZM], ringPt(R, deg + 24, ZC), P);
  }
  out += lineSvg(truss, { tone: "mid" });
  let posts = "", vanes = "";
  for (const deg of [21, 69, 111, 159, 201, 249, 291, 339]) posts += segment(ringPt(R, deg, ZC), ringPt(R, deg, ZC2), P);
  for (const deg of [45, 135, 225, 315]) vanes += segment([0, 0, ZS + 1.5], ringPt(R, deg, ZS + 1.5), P);
  out += lineSvg(ring(0, 0, R, ZC, P, 56), { tone: "hi" }) + lineSvg(posts, { tone: "lo" }) + lineSvg(vanes, { tone: "lo" });
  out += solidSvg(cylinder(0, 0, sec, ZS - 1.5, 3, P, 20), { tone: "mid" });
  out += lineSvg(segment([0, 0, ZS], [R + 2, 0, ZS], P), { tone: "lit" });
  out += lineSvg(ring(0, 0, R, ZC2, P, 56), { tone: "hi" });
  out += solidSvg(slabOf({ x: R - 1, y: -5, w: 15, d: 10, r: 2 }, ZS - 5, 10, P, 4, 0.5), { tone: "mid" });
  out += dotsSvg([iso([R + 14, 0, ZS], P)], { size: 1.5, tone: "hi" });
  return out;
};
const textOf = (mm) => {
  const f = (v, n) => v.toFixed(n).replace(".", ",");
  return "D = " + Math.round(mm) + " mm · resolución " + f(138 / mm, 2) + "″ · " + Math.round((mm / 7) * (mm / 7)) + " veces la luz del ojo";
};

const HTML = "<figure class=\"iso-figure\"><div class=\"iso-plate\"><div class=\"iso-plate-corners\" aria-hidden=\"true\"><span class=\"iso-plate-corner\" data-corner=\"fig\">Fig 20.1</span><span class=\"iso-plate-corner\" data-corner=\"title\">Telescopio Dobson</span><span class=\"iso-plate-corner\" data-corner=\"hint\">Arrastra o usa las flechas</span><span class=\"iso-plate-corner\" data-corner=\"readout\" data-readout>D = 200 mm · resolución 0,69″ · 816 veces la luz del ojo</span></div><div class=\"iso-stage\" tabindex=\"0\" role=\"slider\" aria-label=\"Abertura del telescopio: las flechas pasan de un tamaño habitual a otro\" aria-valuemin=\"100\" aria-valuemax=\"320\" aria-valuenow=\"200\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"iso-svg\" viewBox=\"0 0 640 430\" role=\"img\" aria-label=\"Un telescopio Dobson de celosía apuntando al cénit. En la base, una caja contiene el espejo primario, iluminado. Ocho barras suben hasta una jaula con dos anillos, que sostiene un pequeño espejo secundario en el centro y un portaocular en un lado. Cuatro rayos de luz bajan en vertical hasta el espejo, se reflejan convergiendo hacia el secundario y salen por el lateral hacia el ocular. Al cambiar la abertura, el espejo y la jaula crecen o encogen.\"><path class=\"iso-halo\" d=\"M198.7 343L199.3 341.5L200.3 340.1L201.9 338.9L295 279.3L297.1 278.2L299.5 277.4L302.2 276.8L305.1 276.4L308.1 276.4L311 276.6L313.8 277.2L316.3 278L435.5 324.5L437.6 325.6L439.3 326.8L440.5 328.1L441.2 329.6L441.3 331.1L441.3 338.3L440.7 339.8L439.7 341.2L438.1 342.4L345 402L342.9 403.1L340.5 404L337.8 404.6L334.9 404.9L331.9 404.9L329 404.7L326.2 404.1L323.7 403.3L204.5 356.8L202.4 355.8L200.7 354.5L199.5 353.2L198.8 351.7L198.7 350.3Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M299 294.3L299 292.9L299.7 291.7L301 290.5L302.9 289.6L305.2 289L307.8 288.6L310.4 288.7L312.9 289L315.2 289.7L317 290.6L318.3 291.8L319 293L319 298.9L319 300.2L318.3 301.4L316.9 302.6L315.1 303.5L312.8 304.1L310.2 304.5L307.6 304.5L305.1 304.1L302.8 303.4L300.9 302.5L299.6 301.4L299 300.1Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M316.9 302.6L315.1 303.5L315.1 297.7L316.9 296.8ZM319 298.9L319 300.2L319 294.4L319 293ZM319 300.2L318.3 301.4L318.3 295.6L319 294.4ZM318.3 301.4L316.9 302.6L316.9 296.8L318.3 295.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M315.1 303.5L312.8 304.1L312.8 298.3L315.1 297.7ZM312.8 304.1L310.2 304.5L310.2 298.7L312.8 298.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M310.2 304.5L307.6 304.5L307.6 298.6L310.2 298.7ZM307.6 304.5L305.1 304.1L305.1 298.3L307.6 298.6Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M305.1 304.1L302.8 303.4L302.8 297.6L305.1 298.3ZM302.8 303.4L300.9 302.5L300.9 296.7L302.8 297.6ZM300.9 302.5L299.6 301.4L299.6 295.5L300.9 296.7ZM299.6 301.4L299 300.1L299 294.3L299.6 295.5Z\"/><path class=\"iso-top\" d=\"M316.9 296.8L315.1 297.7L312.8 298.3L310.2 298.7L307.6 298.6L305.1 298.3L302.8 297.6L300.9 296.7L299.6 295.5L299 294.3L299 292.9L299.7 291.7L301 290.5L302.9 289.6L305.2 289L307.8 288.6L310.4 288.7L312.9 289L315.2 289.7L317 290.6L318.3 291.8L319 293L319 294.4L318.3 295.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M319 293L319 294.4L318.3 295.6L316.9 296.8L315.1 297.7L312.8 298.3L310.2 298.7L307.6 298.6L305.1 298.3L302.8 297.6L300.9 296.7L299.6 295.5L299 294.3\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M299 294.3L299 292.9L299.7 291.7L301 290.5L302.9 289.6L305.2 289L307.8 288.6L310.4 288.7L312.9 289L315.2 289.7L317 290.6L318.3 291.8L319 293M319 298.9L319 300.2L318.3 301.4L316.9 302.6L315.1 303.5L312.8 304.1L310.2 304.5L307.6 304.5L305.1 304.1L302.8 303.4L300.9 302.5L299.6 301.4L299 300.1M299 294.3L299 300.1M319 293L319 298.9\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M399.6 333.6L399.7 332.3L400.4 331L401.7 329.9L403.6 328.9L405.9 328.3L408.4 328L411.1 328L413.6 328.3L415.9 329L417.7 329.9L419 331.1L419.7 332.4L419.7 338.2L419.6 339.5L418.9 340.8L417.6 341.9L415.7 342.8L413.4 343.5L410.9 343.8L408.3 343.8L405.7 343.4L403.4 342.8L401.6 341.8L400.3 340.7L399.6 339.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M417.6 341.9L415.7 342.8L415.7 337L417.6 336.1ZM419.7 338.2L419.6 339.5L419.6 333.7L419.7 332.4ZM419.6 339.5L418.9 340.8L418.9 334.9L419.6 333.7ZM418.9 340.8L417.6 341.9L417.6 336.1L418.9 334.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M415.7 342.8L413.4 343.5L413.4 337.6L415.7 337ZM413.4 343.5L410.9 343.8L410.9 338L413.4 337.6Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M410.9 343.8L408.3 343.8L408.3 338L410.9 338ZM408.3 343.8L405.7 343.4L405.7 337.6L408.3 338Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M405.7 343.4L403.4 342.8L403.4 336.9L405.7 337.6ZM403.4 342.8L401.6 341.8L401.6 336L403.4 336.9ZM401.6 341.8L400.3 340.7L400.3 334.9L401.6 336ZM400.3 340.7L399.6 339.4L399.6 333.6L400.3 334.9Z\"/><path class=\"iso-top\" d=\"M417.6 336.1L415.7 337L413.4 337.6L410.9 338L408.3 338L405.7 337.6L403.4 336.9L401.6 336L400.3 334.9L399.6 333.6L399.7 332.3L400.4 331L401.7 329.9L403.6 328.9L405.9 328.3L408.4 328L411.1 328L413.6 328.3L415.9 329L417.7 329.9L419 331.1L419.7 332.4L419.6 333.7L418.9 334.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M419.7 332.4L419.6 333.7L418.9 334.9L417.6 336.1L415.7 337L413.4 337.6L410.9 338L408.3 338L405.7 337.6L403.4 336.9L401.6 336L400.3 334.9L399.6 333.6\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M399.6 333.6L399.7 332.3L400.4 331L401.7 329.9L403.6 328.9L405.9 328.3L408.4 328L411.1 328L413.6 328.3L415.9 329L417.7 329.9L419 331.1L419.7 332.4M419.7 338.2L419.6 339.5L418.9 340.8L417.6 341.9L415.7 342.8L413.4 343.5L410.9 343.8L408.3 343.8L405.7 343.4L403.4 342.8L401.6 341.8L400.3 340.7L399.6 339.4M399.6 333.6L399.6 339.4M419.7 332.4L419.7 338.2\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M220.3 344.6L220.4 343.3L221.1 342L222.4 340.9L224.3 340L226.6 339.3L229.1 339L231.7 339L234.3 339.3L236.6 340L238.4 340.9L239.7 342.1L240.4 343.4L240.4 349.2L240.3 350.5L239.6 351.8L238.3 352.9L236.4 353.8L234.1 354.5L231.6 354.8L228.9 354.8L226.4 354.4L224.1 353.8L222.3 352.8L221 351.7L220.3 350.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M238.3 352.9L236.4 353.8L236.4 348L238.3 347.1ZM240.4 349.2L240.3 350.5L240.3 344.7L240.4 343.4ZM240.3 350.5L239.6 351.8L239.6 346L240.3 344.7ZM239.6 351.8L238.3 352.9L238.3 347.1L239.6 346Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M236.4 353.8L234.1 354.5L234.1 348.7L236.4 348ZM234.1 354.5L231.6 354.8L231.6 349L234.1 348.7Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M231.6 354.8L228.9 354.8L228.9 349L231.6 349ZM228.9 354.8L226.4 354.4L226.4 348.6L228.9 349Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M226.4 354.4L224.1 353.8L224.1 348L226.4 348.6ZM224.1 353.8L222.3 352.8L222.3 347L224.1 348ZM222.3 352.8L221 351.7L221 345.9L222.3 347ZM221 351.7L220.3 350.4L220.3 344.6L221 345.9Z\"/><path class=\"iso-top\" d=\"M238.3 347.1L236.4 348L234.1 348.7L231.6 349L228.9 349L226.4 348.6L224.1 348L222.3 347L221 345.9L220.3 344.6L220.4 343.3L221.1 342L222.4 340.9L224.3 340L226.6 339.3L229.1 339L231.7 339L234.3 339.3L236.6 340L238.4 340.9L239.7 342.1L240.4 343.4L240.3 344.7L239.6 346Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M240.4 343.4L240.3 344.7L239.6 346L238.3 347.1L236.4 348L234.1 348.7L231.6 349L228.9 349L226.4 348.6L224.1 348L222.3 347L221 345.9L220.3 344.6\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M220.3 344.6L220.4 343.3L221.1 342L222.4 340.9L224.3 340L226.6 339.3L229.1 339L231.7 339L234.3 339.3L236.6 340L238.4 340.9L239.7 342.1L240.4 343.4M240.4 349.2L240.3 350.5L239.6 351.8L238.3 352.9L236.4 353.8L234.1 354.5L231.6 354.8L228.9 354.8L226.4 354.4L224.1 353.8L222.3 352.8L221 351.7L220.3 350.4M220.3 344.6L220.3 350.4M240.4 343.4L240.4 349.2\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M321 383.9L321 382.6L321.7 381.3L323.1 380.2L324.9 379.3L327.2 378.6L329.8 378.3L332.4 378.3L334.9 378.7L337.2 379.3L339.1 380.3L340.4 381.4L341 382.7L341 388.5L341 389.8L340.3 391.1L339 392.2L337.1 393.2L334.8 393.8L332.2 394.1L329.6 394.1L327.1 393.8L324.8 393.1L323 392.2L321.7 391L321 389.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M339 392.2L337.1 393.2L337.1 387.3L339 386.4ZM341 388.5L341 389.8L341 384L341 382.7ZM341 389.8L340.3 391.1L340.3 385.3L341 384ZM340.3 391.1L339 392.2L339 386.4L340.3 385.3Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M337.1 393.2L334.8 393.8L334.8 388L337.1 387.3ZM334.8 393.8L332.2 394.1L332.2 388.3L334.8 388Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M332.2 394.1L329.6 394.1L329.6 388.3L332.2 388.3ZM329.6 394.1L327.1 393.8L327.1 387.9L329.6 388.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M327.1 393.8L324.8 393.1L324.8 387.3L327.1 387.9ZM324.8 393.1L323 392.2L323 386.3L324.8 387.3ZM323 392.2L321.7 391L321.7 385.2L323 386.3ZM321.7 391L321 389.7L321 383.9L321.7 385.2Z\"/><path class=\"iso-top\" d=\"M339 386.4L337.1 387.3L334.8 388L332.2 388.3L329.6 388.3L327.1 387.9L324.8 387.3L323 386.3L321.7 385.2L321 383.9L321 382.6L321.7 381.3L323.1 380.2L324.9 379.3L327.2 378.6L329.8 378.3L332.4 378.3L334.9 378.7L337.2 379.3L339.1 380.3L340.4 381.4L341 382.7L341 384L340.3 385.3Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M341 382.7L341 384L340.3 385.3L339 386.4L337.1 387.3L334.8 388L332.2 388.3L329.6 388.3L327.1 387.9L324.8 387.3L323 386.3L321.7 385.2L321 383.9\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M321 383.9L321 382.6L321.7 381.3L323.1 380.2L324.9 379.3L327.2 378.6L329.8 378.3L332.4 378.3L334.9 378.7L337.2 379.3L339.1 380.3L340.4 381.4L341 382.7M341 388.5L341 389.8L340.3 391.1L339 392.2L337.1 393.2L334.8 393.8L332.2 394.1L329.6 394.1L327.1 393.8L324.8 393.1L323 392.2L321.7 391L321 389.7M321 383.9L321 389.7M341 382.7L341 388.5\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M198.7 337.2L199.3 335.7L200.3 334.3L201.9 333.1L295 273.5L297.1 272.4L299.5 271.5L302.2 270.9L305.1 270.6L308.1 270.6L311 270.8L313.8 271.4L316.3 272.2L435.5 318.7L437.6 319.7L439.3 321L440.5 322.3L441.2 323.8L441.3 325.2L441.3 332.5L440.7 334L439.7 335.4L438.1 336.6L345 396.2L342.9 397.3L340.5 398.1L337.8 398.7L334.9 399.1L331.9 399.1L329 398.8L326.2 398.3L323.7 397.5L204.5 351L202.4 349.9L200.7 348.7L199.5 347.4L198.8 345.9L198.7 344.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M441.3 332.5L440.7 334L440.7 326.7L441.3 325.2ZM440.7 334L439.7 335.4L439.7 328.1L440.7 326.7ZM439.7 335.4L438.1 336.6L438.1 329.3L439.7 328.1ZM438.1 336.6L345 396.2L345 388.9L438.1 329.3ZM345 396.2L342.9 397.3L342.9 390L345 388.9ZM342.9 397.3L340.5 398.1L340.5 390.9L342.9 390Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M340.5 398.1L337.8 398.7L337.8 391.5L340.5 390.9ZM337.8 398.7L334.9 399.1L334.9 391.8L337.8 391.5ZM334.9 399.1L331.9 399.1L331.9 391.8L334.9 391.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M331.9 399.1L329 398.8L329 391.6L331.9 391.8ZM329 398.8L326.2 398.3L326.2 391L329 391.6Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M326.2 398.3L323.7 397.5L323.7 390.2L326.2 391ZM323.7 397.5L204.5 351L204.5 343.7L323.7 390.2ZM204.5 351L202.4 349.9L202.4 342.7L204.5 343.7ZM202.4 349.9L200.7 348.7L200.7 341.4L202.4 342.7ZM200.7 348.7L199.5 347.4L199.5 340.1L200.7 341.4ZM199.5 347.4L198.8 345.9L198.8 338.6L199.5 340.1ZM198.8 345.9L198.7 344.4L198.7 337.2L198.8 338.6Z\"/><path class=\"iso-top\" d=\"M435.5 318.7L437.6 319.7L439.3 321L440.5 322.3L441.2 323.8L441.3 325.2L440.7 326.7L439.7 328.1L438.1 329.3L345 388.9L342.9 390L340.5 390.9L337.8 391.5L334.9 391.8L331.9 391.8L329 391.6L326.2 391L323.7 390.2L204.5 343.7L202.4 342.7L200.7 341.4L199.5 340.1L198.8 338.6L198.7 337.2L199.3 335.7L200.3 334.3L201.9 333.1L295 273.5L297.1 272.4L299.5 271.5L302.2 270.9L305.1 270.6L308.1 270.6L311 270.8L313.8 271.4L316.3 272.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M441.3 325.2L440.7 326.7L439.7 328.1L438.1 329.3L345 388.9L342.9 390L340.5 390.9L337.8 391.5L334.9 391.8L331.9 391.8L329 391.6L326.2 391L323.7 390.2L204.5 343.7L202.4 342.7L200.7 341.4L199.5 340.1L198.8 338.6L198.7 337.2\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M441.3 325.2L438.8 326.4L437.9 327.6L436.4 328.8L343.4 388.3L341.6 389.2L339.5 390L337.1 390.5L334.6 390.8L332.1 390.8L329.5 390.6L327.1 390.1L324.9 389.4L205.8 342.9L203.9 342L202.4 340.9L201.4 339.8L200.8 338.5L198.7 337.2\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M198.7 337.2L199.3 335.7L200.3 334.3L201.9 333.1L295 273.5L297.1 272.4L299.5 271.5L302.2 270.9L305.1 270.6L308.1 270.6L311 270.8L313.8 271.4L316.3 272.2L435.5 318.7L437.6 319.7L439.3 321L440.5 322.3L441.2 323.8L441.3 325.2M441.3 332.5L440.7 334L439.7 335.4L438.1 336.6L345 396.2L342.9 397.3L340.5 398.1L337.8 398.7L334.9 399.1L331.9 399.1L329 398.8L326.2 398.3L323.7 397.5L204.5 351L202.4 349.9L200.7 348.7L199.5 347.4L198.8 345.9L198.7 344.4M441.3 325.2L441.3 332.5M198.7 337.2L198.7 344.4\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M382.3 355.5L376.4 358.8L369.9 361.8L362.7 364.4L355 366.6L346.8 368.3L338.3 369.6L329.6 370.4L320.8 370.7L311.9 370.5L303.2 369.8L294.7 368.6L286.4 367L278.6 364.9L271.4 362.3L264.7 359.4L258.7 356.1L253.5 352.5L249.2 348.7L245.7 344.6L243.2 340.4L241.6 336L241 331.6L241.4 327.2L242.8 322.8L245.2 318.5L248.5 314.4L252.7 310.5L257.7 306.9L263.6 303.5L270.1 300.6L277.3 298L285 295.8L293.2 294L301.7 292.8L310.4 292L319.2 291.7L328.1 291.9L336.8 292.6L345.3 293.8L353.6 295.4L361.4 297.5L368.6 300.1L375.3 303L381.3 306.3L386.5 309.9L390.8 313.7L394.3 317.8L396.8 322L398.4 326.4L399 330.8L398.6 335.2L397.2 339.6L394.8 343.9L391.5 348L387.3 351.9Z\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M376.9 300.7L378.5 299.9M382 303.3L383.7 302.5M386.6 306.1L388.5 305.4M390.7 309.1L392.7 308.5M394.3 312.3L396.4 311.7M399.7 319L402 318.7M401.5 322.5L403.8 322.3M402.7 326.1L405.1 326M403.3 329.7L405.7 329.7M403.3 333.4L405.6 333.4M401.2 340.6L403.5 340.8M399.3 344.1L401.5 344.4M396.7 347.5L398.9 347.9M393.6 350.8L395.7 351.3M389.9 353.9L391.9 354.5M381 359.6L382.7 360.4M375.8 362.2L377.4 363M370.2 364.5L371.6 365.4M364.2 366.5L365.4 367.5M357.8 368.3L358.9 369.4M344.4 371.1L345.1 372.2M337.3 372L337.8 373.1M330.2 372.6L330.4 373.7M322.9 372.9L323 374M315.6 372.8L315.5 374M301.2 371.8L300.7 373M294.2 370.8L293.5 372M287.4 369.6L286.5 370.7M280.9 368L279.8 369M274.6 366.2L273.3 367.1M263.1 361.7L261.5 362.5M258 359.1L256.3 359.9M253.4 356.3L251.5 357M249.3 353.3L247.3 353.9M245.7 350.1L243.6 350.7M240.3 343.4L238 343.7M238.5 339.9L236.2 340.1M237.3 336.3L234.9 336.4M236.7 332.7L234.3 332.7M236.7 329L234.4 329M238.8 321.8L236.5 321.6M240.7 318.3L238.5 318M243.3 314.9L241.1 314.5M246.4 311.6L244.3 311.1M250.1 308.5L248.1 307.9M259 302.8L257.3 302M264.2 300.2L262.6 299.3M269.8 297.9L268.4 297M275.8 295.8L274.6 294.9M282.2 294.1L281.1 293M295.6 291.3L294.9 290.2M302.7 290.4L302.2 289.3M309.8 289.8L309.6 288.7M317.1 289.5L317 288.4M324.4 289.6L324.5 288.4M338.8 290.6L339.3 289.4M345.8 291.6L346.5 290.4M352.6 292.8L353.5 291.7M359.1 294.4L360.2 293.4M365.4 296.2L366.7 295.3\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M369.7 299.4L372.8 297.4M394.8 316.1L399.5 315.1M399.9 336.8L404.9 337.2M383.6 356L387.5 357.6M350.2 368.6L352.1 370.9M308.8 371.1L308.1 373.6M270.3 363L267.2 365M245.2 346.3L240.5 347.3M240.1 325.6L235.1 325.2M256.4 306.4L252.5 304.8M289.8 293.8L287.9 291.5M331.2 291.3L331.9 288.8\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M229.1 310.6L229.1 309.5L229.7 308.4L230.8 307.5L303.2 261.1L304.8 260.4L306.7 259.8L308.8 259.5L311 259.5L313.1 259.8L315 260.4L407.7 296.6L409.3 297.4L410.4 298.4L410.9 299.4L410.9 325.6L410.9 326.7L410.3 327.8L409.2 328.7L336.8 375.1L335.2 375.8L333.3 376.4L331.2 376.7L329 376.6L326.9 376.4L325 375.8L232.3 339.6L230.7 338.8L229.6 337.8L229.1 336.8Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M410.9 325.6L410.9 326.7L410.9 300.5L410.9 299.4ZM410.9 326.7L410.3 327.8L410.3 301.6L410.9 300.5ZM410.3 327.8L409.2 328.7L409.2 302.5L410.3 301.6ZM409.2 328.7L336.8 375.1L336.8 348.9L409.2 302.5ZM336.8 375.1L335.2 375.8L335.2 349.6L336.8 348.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M335.2 375.8L333.3 376.4L333.3 350.2L335.2 349.6ZM333.3 376.4L331.2 376.7L331.2 350.5L333.3 350.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M331.2 376.7L329 376.6L329 350.4L331.2 350.5ZM329 376.6L326.9 376.4L326.9 350.2L329 350.4Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M326.9 376.4L325 375.8L325 349.6L326.9 350.2ZM325 375.8L232.3 339.6L232.3 313.4L325 349.6ZM232.3 339.6L230.7 338.8L230.7 312.6L232.3 313.4ZM230.7 338.8L229.6 337.8L229.6 311.6L230.7 312.6ZM229.6 337.8L229.1 336.8L229.1 310.6L229.6 311.6Z\"/><path class=\"iso-top\" d=\"M407.7 296.6L409.3 297.4L410.4 298.4L410.9 299.4L410.9 300.5L410.3 301.6L409.2 302.5L336.8 348.9L335.2 349.6L333.3 350.2L331.2 350.5L329 350.4L326.9 350.2L325 349.6L232.3 313.4L230.7 312.6L229.6 311.6L229.1 310.6L229.1 309.5L229.7 308.4L230.8 307.5L303.2 261.1L304.8 260.4L306.7 259.8L308.8 259.5L311 259.5L313.1 259.8L315 260.4Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M410.9 299.4L410.9 300.5L410.3 301.6L409.2 302.5L336.8 348.9L335.2 349.6L333.3 350.2L331.2 350.5L329 350.4L326.9 350.2L325 349.6L232.3 313.4L230.7 312.6L229.6 311.6L229.1 310.6\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M410.9 299.4L409.6 300.4L409.1 301.3L408.1 302.1L335.8 348.4L334.4 349.1L332.8 349.6L331 349.8L329.2 349.8L327.4 349.5L325.7 349L233.1 312.9L231.8 312.2L230.9 311.4L229.1 310.6\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M229.1 310.6L229.1 309.5L229.7 308.4L230.8 307.5L303.2 261.1L304.8 260.4L306.7 259.8L308.8 259.5L311 259.5L313.1 259.8L315 260.4L407.7 296.6L409.3 297.4L410.4 298.4L410.9 299.4M410.9 325.6L410.9 326.7L410.3 327.8L409.2 328.7L336.8 375.1L335.2 375.8L333.3 376.4L331.2 376.7L329 376.6L326.9 376.4L325 375.8L232.3 339.6L230.7 338.8L229.6 337.8L229.1 336.8M410.9 299.4L410.9 325.6M229.1 310.6L229.1 336.8\"/></g><path class=\"iso-line\" data-tone=\"faint\" d=\"M404.6 298.6L405.4 299L405.8 299.5L405.9 300L405.7 300.5L405.2 301L332.8 347.3L332 347.7L331.1 347.9L330 348L329 347.9L328.1 347.6L235.4 311.4L234.6 311L234.2 310.5L234.1 310L234.3 309.5L234.8 309L307.2 262.7L308 262.3L308.9 262.1L310 262L311 262.1L311.9 262.4Z\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M366.4 323.1L361.2 326L355.4 328.5L349 330.6L342 332.3L334.7 333.5L327.2 334.2L319.5 334.4L311.8 334.1L304.3 333.3L297 332.1L290.1 330.3L283.8 328.2L278 325.6L273 322.7L268.8 319.5L265.5 316L263 312.4L261.6 308.6L261.2 304.7L261.7 300.9L263.3 297.1L265.8 293.5L269.3 290.1L273.6 286.9L278.8 284L284.6 281.5L291 279.4L298 277.7L305.3 276.5L312.8 275.8L320.5 275.6L328.2 275.9L335.7 276.7L343 277.9L349.9 279.7L356.2 281.8L362 284.4L367 287.3L371.2 290.5L374.5 294L377 297.6L378.4 301.4L378.8 305.3L378.3 309.1L376.7 312.9L374.2 316.5L370.7 319.9Z\"/><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"309.9\" cy=\"263.7\" r=\"0.55\"/><circle cx=\"402.6\" cy=\"299.9\" r=\"0.55\"/><circle cx=\"237.4\" cy=\"310.1\" r=\"0.55\"/><circle cx=\"330.1\" cy=\"346.3\" r=\"0.55\"/></g><g data-part=\"live\"><g class=\"iso-solid\" data-lit=\"\"><path class=\"iso-fill\" d=\"M286.4 302.2L286.5 299.8L287.3 297.4L288.8 295.2L290.8 293L293.5 291L296.7 289.2L300.4 287.7L304.5 286.4L308.9 285.5L313.5 284.9L318.3 284.6L323.1 284.6L327.8 285L332.4 285.7L336.7 286.8L340.7 288.1L344.3 289.7L347.3 291.6L349.8 293.6L351.7 295.8L353 298.1L353.6 300.5L353.6 304.1L353.5 306.5L352.7 308.9L351.2 311.2L349.2 313.4L346.5 315.3L343.3 317.1L339.6 318.7L335.5 319.9L331.1 320.9L326.5 321.5L321.7 321.8L316.9 321.7L312.2 321.3L307.6 320.6L303.3 319.6L299.3 318.2L295.7 316.6L292.7 314.8L290.2 312.7L288.3 310.5L287 308.2L286.4 305.9Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M346.5 315.3L343.3 317.1L343.3 313.5L346.5 311.7ZM343.3 317.1L339.6 318.7L339.6 315L343.3 313.5ZM339.6 318.7L335.5 319.9L335.5 316.3L339.6 315ZM353.6 304.1L353.5 306.5L353.5 302.9L353.6 300.5ZM353.5 306.5L352.7 308.9L352.7 305.3L353.5 302.9ZM352.7 308.9L351.2 311.2L351.2 307.6L352.7 305.3ZM351.2 311.2L349.2 313.4L349.2 309.7L351.2 307.6ZM349.2 313.4L346.5 315.3L346.5 311.7L349.2 309.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M335.5 319.9L331.1 320.9L331.1 317.2L335.5 316.3ZM331.1 320.9L326.5 321.5L326.5 317.9L331.1 317.2ZM326.5 321.5L321.7 321.8L321.7 318.1L326.5 317.9Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M321.7 321.8L316.9 321.7L316.9 318.1L321.7 318.1ZM316.9 321.7L312.2 321.3L312.2 317.7L316.9 318.1ZM312.2 321.3L307.6 320.6L307.6 317L312.2 317.7ZM307.6 320.6L303.3 319.6L303.3 315.9L307.6 317Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M303.3 319.6L299.3 318.2L299.3 314.6L303.3 315.9ZM299.3 318.2L295.7 316.6L295.7 313L299.3 314.6ZM295.7 316.6L292.7 314.8L292.7 311.2L295.7 313ZM292.7 314.8L290.2 312.7L290.2 309.1L292.7 311.2ZM290.2 312.7L288.3 310.5L288.3 306.9L290.2 309.1ZM288.3 310.5L287 308.2L287 304.6L288.3 306.9ZM287 308.2L286.4 305.9L286.4 302.2L287 304.6Z\"/><path class=\"iso-top\" d=\"M346.5 311.7L343.3 313.5L339.6 315L335.5 316.3L331.1 317.2L326.5 317.9L321.7 318.1L316.9 318.1L312.2 317.7L307.6 317L303.3 315.9L299.3 314.6L295.7 313L292.7 311.2L290.2 309.1L288.3 306.9L287 304.6L286.4 302.2L286.5 299.8L287.3 297.4L288.8 295.2L290.8 293L293.5 291L296.7 289.2L300.4 287.7L304.5 286.4L308.9 285.5L313.5 284.9L318.3 284.6L323.1 284.6L327.8 285L332.4 285.7L336.7 286.8L340.7 288.1L344.3 289.7L347.3 291.6L349.8 293.6L351.7 295.8L353 298.1L353.6 300.5L353.5 302.9L352.7 305.3L351.2 307.6L349.2 309.7Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M353.6 300.5L353.5 302.9L352.7 305.3L351.2 307.6L349.2 309.7L346.5 311.7L343.3 313.5L339.6 315L335.5 316.3L331.1 317.2L326.5 317.9L321.7 318.1L316.9 318.1L312.2 317.7L307.6 317L303.3 315.9L299.3 314.6L295.7 313L292.7 311.2L290.2 309.1L288.3 306.9L287 304.6L286.4 302.2\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M353.6 300.5L352.6 302.9L351.9 305.2L350.5 307.4L348.4 309.5L345.8 311.4L342.7 313.2L339.1 314.7L335.1 315.9L330.8 316.8L326.3 317.4L321.7 317.7L317 317.7L312.4 317.3L307.9 316.6L303.7 315.6L299.8 314.3L296.4 312.7L293.4 310.9L290.9 308.9L289.1 306.8L287.8 304.5L286.4 302.2\"/><path class=\"iso-line iso-edge\" data-tone=\"hi\" d=\"M286.4 302.2L286.5 299.8L287.3 297.4L288.8 295.2L290.8 293L293.5 291L296.7 289.2L300.4 287.7L304.5 286.4L308.9 285.5L313.5 284.9L318.3 284.6L323.1 284.6L327.8 285L332.4 285.7L336.7 286.8L340.7 288.1L344.3 289.7L347.3 291.6L349.8 293.6L351.7 295.8L353 298.1L353.6 300.5M353.6 304.1L353.5 306.5L352.7 308.9L351.2 311.2L349.2 313.4L346.5 315.3L343.3 317.1L339.6 318.7L335.5 319.9L331.1 320.9L326.5 321.5L321.7 321.8L316.9 321.7L312.2 321.3L307.6 320.6L303.3 319.6L299.3 318.2L295.7 316.6L292.7 314.8L290.2 312.7L288.3 310.5L287 308.2L286.4 305.9M286.4 302.2L286.4 305.9M353.6 300.5L353.6 304.1\"/></g><path class=\"iso-line\" data-tone=\"mid\" d=\"M325.3 303.4L323.8 304.1L321.9 304.6L319.8 304.7L317.7 304.5L315.9 304L314.4 303.2L313.5 302.3L313.3 301.2L313.7 300.2L314.7 299.3L316.2 298.6L318.1 298.1L320.2 298L322.3 298.2L324.1 298.7L325.6 299.5L326.5 300.4L326.7 301.5L326.3 302.5Z\"/><path class=\"iso-line\" data-tone=\"mid\" data-dashed=\"\" d=\"M300.4 293.7L316.1 133.2M335.3 291.6L323.1 132.7M339.6 309L323.9 136.2M304.7 311.2L316.9 136.6\"/><path class=\"iso-line\" data-tone=\"lit\" d=\"M300.4 61.5L300.4 293.7M335.3 59.4L335.3 291.6M339.6 76.8L339.6 309M304.7 79L304.7 311.2\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M309.9 263.7L298.4 126.9M309.9 263.7L332.3 124.8M402.6 299.9L356 134.1M402.6 299.9L360.2 151M237.4 310.1L284 155.7M237.4 310.1L279.8 138.7M330.1 346.3L341.6 162.9M330.1 346.3L307.7 165\"/><path class=\"iso-line\" data-tone=\"hi\" d=\"M353.1 157.8L350 159.6L346.5 161.2L342.7 162.6L338.6 163.7L334.3 164.6L329.8 165.3L325.1 165.7L320.4 165.9L315.7 165.8L311.1 165.4L306.5 164.8L302.1 163.9L298 162.8L294.1 161.4L290.6 159.9L287.4 158.1L284.6 156.2L282.3 154.2L280.5 152L279.1 149.8L278.3 147.4L278 145.1L278.2 142.7L278.9 140.4L280.2 138.1L282 136L284.2 133.9L286.9 131.9L290 130.2L293.5 128.6L297.3 127.2L301.4 126L305.7 125.1L310.2 124.4L314.9 124L319.6 123.9L324.3 124L328.9 124.3L333.5 125L337.9 125.9L342 127L345.9 128.3L349.4 129.9L352.6 131.6L355.4 133.5L357.7 135.6L359.5 137.7L360.9 140L361.7 142.3L362 144.7L361.8 147L361.1 149.3L359.8 151.6L358 153.8L355.8 155.9Z\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M341.6 162.9L341.6 142.5M307.7 165L307.7 144.6M284 155.7L284 135.3M279.8 138.7L279.8 118.4M298.4 126.9L298.4 106.5M332.3 124.8L332.3 104.4M356 134.1L356 113.7M360.2 151L360.2 130.6\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M320 132.5L325.1 153.4M320 132.5L278.3 135.1M320 132.5L314.9 111.7M320 132.5L361.7 129.9\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M313.3 132.4L313.7 131.4L314.7 130.4L316.2 129.7L318.1 129.3L320.2 129.1L322.3 129.3L324.1 129.9L325.6 130.6L326.5 131.6L326.7 132.6L326.7 137L326.3 138L325.3 138.9L323.8 139.7L321.9 140.1L319.8 140.2L317.7 140L315.9 139.5L314.4 138.8L313.5 137.8L313.3 136.8Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M325.3 138.9L323.8 139.7L323.8 135.3L325.3 134.6ZM326.7 137L326.3 138L326.3 133.7L326.7 132.6ZM326.3 138L325.3 138.9L325.3 134.6L326.3 133.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M323.8 139.7L321.9 140.1L321.9 135.7L323.8 135.3ZM321.9 140.1L319.8 140.2L319.8 135.9L321.9 135.7Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M319.8 140.2L317.7 140L317.7 135.7L319.8 135.9ZM317.7 140L315.9 139.5L315.9 135.2L317.7 135.7Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M315.9 139.5L314.4 138.8L314.4 134.4L315.9 135.2ZM314.4 138.8L313.5 137.8L313.5 133.4L314.4 134.4ZM313.5 137.8L313.3 136.8L313.3 132.4L313.5 133.4Z\"/><path class=\"iso-top\" d=\"M325.3 134.6L323.8 135.3L321.9 135.7L319.8 135.9L317.7 135.7L315.9 135.2L314.4 134.4L313.5 133.4L313.3 132.4L313.7 131.4L314.7 130.4L316.2 129.7L318.1 129.3L320.2 129.1L322.3 129.3L324.1 129.9L325.6 130.6L326.5 131.6L326.7 132.6L326.3 133.7Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M326.7 132.6L326.3 133.7L325.3 134.6L323.8 135.3L321.9 135.7L319.8 135.9L317.7 135.7L315.9 135.2L314.4 134.4L313.5 133.4L313.3 132.4\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M313.3 132.4L313.7 131.4L314.7 130.4L316.2 129.7L318.1 129.3L320.2 129.1L322.3 129.3L324.1 129.9L325.6 130.6L326.5 131.6L326.7 132.6M326.7 137L326.3 138L325.3 138.9L323.8 139.7L321.9 140.1L319.8 140.2L317.7 140L315.9 139.5L314.4 138.8L313.5 137.8L313.3 136.8M313.3 132.4L313.3 136.8M326.7 132.6L326.7 137\"/></g><path class=\"iso-line\" data-tone=\"lit\" d=\"M320 134.7L355.8 148.7\"/><path class=\"iso-line\" data-tone=\"hi\" d=\"M353.1 137.4L350 139.2L346.5 140.8L342.7 142.2L338.6 143.3L334.3 144.3L329.8 144.9L325.1 145.4L320.4 145.5L315.7 145.4L311.1 145L306.5 144.4L302.1 143.5L298 142.4L294.1 141.1L290.6 139.5L287.4 137.8L284.6 135.9L282.3 133.8L280.5 131.6L279.1 129.4L278.3 127.1L278 124.7L278.2 122.4L278.9 120L280.2 117.8L282 115.6L284.2 113.5L286.9 111.6L290 109.8L293.5 108.2L297.3 106.8L301.4 105.7L305.7 104.7L310.2 104.1L314.9 103.6L319.6 103.5L324.3 103.6L328.9 104L333.5 104.6L337.9 105.5L342 106.6L345.9 107.9L349.4 109.5L352.6 111.2L355.4 113.1L357.7 115.2L359.5 117.4L360.9 119.6L361.7 121.9L362 124.3L361.8 126.6L361.1 129L359.8 131.2L358 133.4L355.8 135.5Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M348 143.1L348.1 142.4L348.7 141.8L354.9 137.8L355.9 137.4L357.1 137.2L358.4 137.3L359.6 137.6L374.2 143.2L375 143.7L375.4 144.4L375.4 158.9L375.4 159.6L374.8 160.2L368.6 164.1L367.6 164.6L366.3 164.8L365 164.7L363.8 164.4L349.3 158.7L348.4 158.2L348 157.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M375.4 158.9L375.4 159.6L375.4 145L375.4 144.4ZM375.4 159.6L374.8 160.2L374.8 145.6L375.4 145ZM374.8 160.2L368.6 164.1L368.6 149.6L374.8 145.6ZM368.6 164.1L367.6 164.6L367.6 150L368.6 149.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M367.6 164.6L366.3 164.8L366.3 150.2L367.6 150Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M366.3 164.8L365 164.7L365 150.2L366.3 150.2ZM365 164.7L363.8 164.4L363.8 149.9L365 150.2Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M363.8 164.4L349.3 158.7L349.3 144.2L363.8 149.9ZM349.3 158.7L348.4 158.2L348.4 143.7L349.3 144.2ZM348.4 158.2L348 157.6L348 143.1L348.4 143.7Z\"/><path class=\"iso-top\" d=\"M374.2 143.2L375 143.7L375.4 144.4L375.4 145L374.8 145.6L368.6 149.6L367.6 150L366.3 150.2L365 150.2L363.8 149.9L349.3 144.2L348.4 143.7L348 143.1L348.1 142.4L348.7 141.8L354.9 137.8L355.9 137.4L357.1 137.2L358.4 137.3L359.6 137.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M375.4 144.4L375.4 145L374.8 145.6L368.6 149.6L367.6 150L366.3 150.2L365 150.2L363.8 149.9L349.3 144.2L348.4 143.7L348 143.1\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M375.4 144.4L374.5 144.9L374 145.4L367.9 149.3L367.1 149.6L366.2 149.8L365.2 149.8L364.3 149.5L349.8 143.9L349.1 143.5L348 143.1\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M348 143.1L348.1 142.4L348.7 141.8L354.9 137.8L355.9 137.4L357.1 137.2L358.4 137.3L359.6 137.6L374.2 143.2L375 143.7L375.4 144.4M375.4 158.9L375.4 159.6L374.8 160.2L368.6 164.1L367.6 164.6L366.3 164.8L365 164.7L363.8 164.4L349.3 158.7L348.4 158.2L348 157.6M375.4 144.4L375.4 158.9M348 143.1L348 157.6\"/></g><g class=\"iso-dots\" data-tone=\"hi\"><circle cx=\"371.7\" cy=\"154.9\" r=\"1.5\"/></g></g></svg></div></div><figcaption class=\"iso-legend\"><span class=\"iso-keys\"><span class=\"iso-key\"><svg class=\"iso-swatch\" data-mark=\"lit\" viewBox=\"0 0 16 10\" aria-hidden=\"true\"><path d=\"M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z\"/><path class=\"iso-swatch-crease\" d=\"M2 4.5 8 7.5 14 4.5\"/></svg>Espejo primario y luz que llega de la estrella</span><span class=\"iso-key\"><svg class=\"iso-swatch\" data-mark=\"dashed\" viewBox=\"0 0 16 10\" aria-hidden=\"true\"><path d=\"M1.5 5h13\"/></svg>Luz reflejada, que converge hacia el espejo secundario</span><span class=\"iso-key\"><svg class=\"iso-swatch\" data-mark=\"raised\" viewBox=\"0 0 16 10\" aria-hidden=\"true\"><path d=\"M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z\"/><path class=\"iso-swatch-crease\" d=\"M2 4.5 8 7.5 14 4.5\"/></svg>Caja del espejo, jaula y portaocular</span></span><span class=\"iso-caption\">Al aumentar la abertura entra más luz, en proporción al cuadrado del diámetro, y se distinguen detalles más finos, en proporción inversa. La resolución que se indica es el límite de difracción, 138/D. La atmósfera rara vez deja bajar de un segundo de arco, así que por encima de unos 150 mm la abertura se nota sobre todo en la luz.</span></figcaption></figure>";

function mount(host) {
  const theme = () => { const t = document.documentElement.getAttribute("data-theme"); return t === "dark" || t === "light" ? t : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); };
  host.innerHTML = '<div class="iso" data-theme="' + theme() + '">' + HTML + "</div>";
  const wrap = host.firstChild, retheme = () => wrap.setAttribute("data-theme", theme());
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", retheme);
  new MutationObserver(retheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const stage = host.querySelector(".iso-stage"), svg = stage.querySelector("svg");
  const live = svg.querySelector('[data-part="live"]'), readout = host.querySelector("[data-readout]");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  let s = 200, target = s, drawn = -1, frame = 0, last = 0, clock = 0, touring = !still.matches, visible = false, idle = 0;
  const order = [2, 3, 4, 3, 2, 1, 0, 1];
  function draw() {
    if (s === drawn) return; drawn = s;
    live.innerHTML = liveAt(s);
    const text = textOf(s);
    if (readout.textContent !== text) readout.textContent = text;
    stage.setAttribute("aria-valuenow", String(Math.round(s))); stage.setAttribute("aria-valuetext", text);
  }
  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60; last = now;
    if (touring) { clock += dt; target = STOPS[order[Math.floor(clock / 2.6) % order.length]]; }
    s = still.matches ? target : s + (target - s) * (1 - Math.exp(-dt / 0.3));
    if (Math.abs(target - s) < 0.3) s = target;
    draw();
    frame = visible && (touring || s !== target) ? requestAnimationFrame(tick) : 0;
  }
  const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
  const steer = (next) => { touring = false; target = clamp(next, REACH[0], REACH[1]); clearTimeout(idle); idle = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 6000); run(); };
  new IntersectionObserver((es) => { visible = es[es.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
  stage.addEventListener("pointermove", (ev) => {
    const box = svg.getBoundingClientRect(), share = clamp(((ev.clientX - box.left) / box.width - 0.2) / 0.6, 0, 1);
    steer(REACH[0] + share * (REACH[1] - REACH[0]));
  });
  stage.addEventListener("keydown", (ev) => {
    const here = STOPS.reduce((b, x, i) => (Math.abs(x - target) < Math.abs(STOPS[b] - target) ? i : b), 0);
    let to = null;
    if (ev.key === "ArrowRight" || ev.key === "ArrowUp") to = Math.min(STOPS.length - 1, here + 1);
    if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") to = Math.max(0, here - 1);
    if (ev.key === "Home") to = 0;
    if (ev.key === "End") to = STOPS.length - 1;
    if (to === null) return;
    ev.preventDefault(); steer(STOPS[to]);
  });
  draw();
}

if (!document.getElementById("iso-css")) { const st = document.createElement("style"); st.id = "iso-css"; st.textContent = ISO_CSS + ".iso-figure{margin:4px 0 18px}.iso-stage{outline-offset:4px;touch-action:pan-y}.iso-legend{font-size:.85rem}@media(max-width:600px){.iso-plate-corner[data-corner=hint]{display:none}}"; document.head.appendChild(st); }
(window.FIGS = window.FIGS || {}).telescopio = mount;
})();
