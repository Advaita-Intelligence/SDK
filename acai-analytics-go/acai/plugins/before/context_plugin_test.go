package before_test

import (
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/acai/analytics-go/acai/plugins/before"
	"github.com/acai/analytics-go/acai/types"
)

func TestContextPlugin(t *testing.T) {
	suite.Run(t, new(ContextPluginSuite))
}

type ContextPluginSuite struct {
	suite.Suite
}

func (t *ContextPluginSuite) TestContextPlugin() {
	plugin := before.NewContextPlugin()
	plugin.Setup(types.Config{})

	require := t.Require()
	require.Equal("context", plugin.Name())
	require.Equal(types.PluginTypeBefore, plugin.Type())

	originalEvent := &types.Event{}
	event := plugin.Execute(originalEvent)
	require.Same(originalEvent, event)
	require.NotEmpty(event.InsertID)
	require.NotEmpty(event.Time)
	require.NotEmpty(event.Library)
}
