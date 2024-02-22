# deploy_all.sh
echo "Starting deployment of all components..."

echo "Deploying Prometheus..."
cd prometheus && ./deploy.sh $1

echo "Deploying Alert Manager..."
cd ../alert-manager && ./deploy.sh

echo "Deploying Grafana..."
cd ../grafana && ./deploy.sh

echo "Deploying Loki..."
cd ../loki && ./deploy.sh

echo "Deploying Promtail..."
cd ../promtail && ./deploy.sh

echo "Deploying Node Exporter..."
cd ../node-exporter && ./deploy.sh

echo "Deploying Prometheus State Metrics..."
cd ../state-metrics && ./deploy.sh


echo "Deployment of all components completed."
