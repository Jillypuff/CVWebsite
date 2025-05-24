import { Vector2D } from './vector2d.js';

export interface Ball {
    id: number;
    position: Vector2D;
    velocity: Vector2D;
    radius: number;
    color: string;
    mass: number;
}