/*global define*/
define([
        'Core/defaultValue',
        'Core/Ellipsoid',
        'Core/GeographicProjection',
        'Core/JulianDate',
        'Scene/Camera',
        'Scene/CreditDisplay',
        'Scene/FrameState'
    ], function(
        defaultValue,
        Ellipsoid,
        GeographicProjection,
        JulianDate,
        Camera,
        CreditDisplay,
        FrameState) {
    "use strict";

    var createFrameState = function(camera, frameNumber, time) {
        // Mock frame-state for testing.
        var frameState = new FrameState(new CreditDisplay(document.createElement('div')));

        frameState.scene2D = {
            projection : new GeographicProjection(Ellipsoid.WGS84)
        };

        frameState.frameNumber = defaultValue(frameNumber, 1.0);
        frameState.time = defaultValue(time, JulianDate.fromDate(new Date('January 1, 2011 12:00:00 EST')));

        camera = defaultValue(camera, new Camera({
            drawingBufferWidth : 1,
            drawingBufferHeight : 1,
            scene2D : frameState.scene2D
        }));
        frameState.camera = camera;
        frameState.cullingVolume = camera.frustum.computeCullingVolume(camera.position, camera.direction, camera.up);

        frameState.passes.render = true;
        frameState.passes.pick = false;

        return frameState;
    };

    return createFrameState;
});