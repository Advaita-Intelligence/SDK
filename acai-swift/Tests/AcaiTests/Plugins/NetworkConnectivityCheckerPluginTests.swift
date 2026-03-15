//
//  NetworkConnectivityCheckerPluginTests.swift
//  Acai-SwiftTests
//
//  Created by Xinyi.Ye on 1/29/24.
//

import XCTest

@testable import AcaiSwift

final class NetworkConnectivityCheckerPluginTests: XCTestCase {
    private var mockPathCreation: MockPathCreation!
    private var plugin: NetworkConnectivityCheckerPlugin!
    private var amplitude: Amplitude!

    override func setUp() {
        super.setUp()
        mockPathCreation = MockPathCreation()
        amplitude = Acai(configuration: Configuration(apiKey: "test-api-key"))
        plugin = NetworkConnectivityCheckerPlugin(pathCreation: mockPathCreation)
        plugin.setup(amplitude: amplitude)
    }

    func testNetworkBecomesOnline() {
        mockPathCreation.simulateNetworkChange(status: .satisfied)
        XCTAssertEqual(amplitude.configuration.offline, false)
    }

    func testNetworkBecomesOffline() {
        mockPathCreation.simulateNetworkChange(status: .unsatisfied)
        XCTAssertEqual(amplitude.configuration.offline, true)
    }
}
